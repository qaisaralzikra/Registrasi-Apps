<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\QrCode;
use App\Models\Registrasi;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function create(Event $event): Response
    {
        return Inertia::render('Registration/Create', [
            'event' => [
                'id' => $event->id,
                'title_event' => $event->title_event,
                'subtitle_event' => $event->subtitle_event,
                'date_time_event' => $event->date_time_event?->format('d MMM yyyy'),
                'venue' => $event->venue,
                'fields' => $event->custom_fields_template ?? [
                    ['label' => 'Full Name', 'key' => 'full_name', 'type' => 'text', 'required' => true],
                    ['label' => 'Email Address', 'key' => 'email', 'type' => 'email', 'required' => true],
                    ['label' => 'Phone Number', 'key' => 'phone', 'type' => 'tel', 'required' => true],
                    ['label' => 'Organization / Company', 'key' => 'organization', 'type' => 'text', 'required' => false],
                    ['label' => 'Role / Title', 'key' => 'role', 'type' => 'text', 'required' => true],
                ],
            ],
        ]);
    }

    public function store(Request $request, Event $event): RedirectResponse
    {
        $fields = $event->custom_fields_template ?? [
            ['label' => 'Full Name', 'key' => 'full_name', 'type' => 'text', 'required' => true],
            ['label' => 'Email Address', 'key' => 'email', 'type' => 'email', 'required' => true],
            ['label' => 'Phone Number', 'key' => 'phone', 'type' => 'tel', 'required' => true],
            ['label' => 'Organization / Company', 'key' => 'organization', 'type' => 'text', 'required' => false],
            ['label' => 'Role / Title', 'key' => 'role', 'type' => 'text', 'required' => true],
        ];

        $rules = [];
        foreach ($fields as $field) {
            if (($field['required'] ?? false) === true) {
                $rules[$field['key']] = ['required', 'string', 'max:255'];
            } else {
                $rules[$field['key']] = ['nullable', 'string', 'max:255'];
            }

            if (($field['type'] ?? '') === 'email') {
                $rules[$field['key']][] = 'email';
            }

            if (($field['type'] ?? '') === 'tel') {
                $rules[$field['key']][] = 'regex:/^\+?[0-9\s\-\.]+$/';
            }
        }

        $validated = $request->validate($rules);

        $user = User::create([
            'id_events' => $event->id,
            'status' => 'belum hadir',
        ]);

        Registrasi::create([
            'id_user' => $user->id,
            'id_event' => $event->id,
            'custom_field_values' => $validated,
        ]);

        $token = Str::upper(Str::random(10));

        QrCode::create([
            'id_user' => $user->id,
            'id_event' => $event->id,
            'qr_token' => $token,
            'is_used' => false,
        ]);

        return redirect()->route('events.register.success', ['event' => $event->id, 'token' => $token]);
    }

    public function success(Event $event, string $token): Response
    {
        $qr = QrCode::where('qr_token', $token)->where('id_event', $event->id)->firstOrFail();
        $user = $qr->user;
        $registrasi = $user->registrasi;
        $fields = $registrasi->custom_field_values ?? [];

        return Inertia::render('Registration/Success', [
            'event' => [
                'id' => $event->id,
                'title_event' => $event->title_event,
                'date_time_event' => $event->date_time_event?->format('d MMM yyyy'),
                'venue' => $event->venue,
            ],
            'attendee' => [
                'name' => $fields['full_name'] ?? $fields['Full Name'] ?? '-',
                'email' => $fields['email'] ?? $fields['Email Address'] ?? '-',
                'role' => $fields['role'] ?? $fields['Role / Title'] ?? '-',
            ],
            'token' => $qr->qr_token,
            'status' => $qr->is_used ? 'confirmed' : 'pending',
        ]);
    }
}
