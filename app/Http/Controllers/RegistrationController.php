<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\QrCode;
use App\Models\Registrasi;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function create($events): Response
    {
        $event = Event::where('title_event', $events)->first();

        return Inertia::render('Registration/Create', [
            'event' => [
                'id' => $event->id,
                'title_event' => $event->title_event,
                'subtitle_event' => $event->subtitle_event,
                'date_time_event' => $event->date_time_event?->format('d M Y'),
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

    public function store(Request $request, $events): RedirectResponse
    {
        $event = Event::where('title_event', $events)->firstOrFail();
        $fields = $event->custom_fields_template ?? [
            ['label' => 'Full Name', 'key' => 'full_name', 'type' => 'text', 'required' => true, 'active' => true],
            ['label' => 'Email Address', 'key' => 'email', 'type' => 'email', 'required' => true, 'active' => true],
            ['label' => 'Phone Number', 'key' => 'phone', 'type' => 'phone', 'required' => true, 'active' => true],
            ['label' => 'Organization / Company', 'key' => 'organization', 'type' => 'text', 'required' => false, 'active' => true],
            ['label' => 'Role / Title', 'key' => 'role', 'type' => 'text', 'required' => true, 'active' => true],
        ];

        $rules = [];
        $attributes = [];

        foreach ($fields as $field) {
            // Skip jika field dinonaktifkan
            if (isset($field['active']) && !$field['active']) {
                continue;
            }

            $key = $field['key'];
            $isRequired = !empty($field['required']);
            $isMultiple = !empty($field['allowMultiple']);

            // Handle field jika mengizinkan multi-input (Array)
            if ($isMultiple) {
                $rules[$key] = $isRequired ? ['required', 'array', 'min:1'] : ['nullable', 'array'];

                $itemRules = [];
                $this->applyTypeRules($field, $itemRules);
                $rules["{$key}.*"] = $itemRules;
            } else {
                $fieldRules = [$isRequired ? 'required' : 'nullable'];
                $this->applyTypeRules($field, $fieldRules);
                $rules[$key] = $fieldRules;
            }

            $attributes[$key] = $field['label'] ?? $key;
        }

        // 1. Jalankan Validasi Dinamis
        $validated = $request->validate($rules, [], $attributes);

        // 2. Upload & Transform File (Jika Ada Tipe Input 'file')
        foreach ($fields as $field) {
            $key = $field['key'];
            if (($field['type'] ?? '') === 'file' && $request->hasFile($key)) {
                if (!empty($field['allowMultiple'])) {
                    $paths = [];
                    foreach ($request->file($key) as $file) {
                        $paths[] = $file->store('registration_files', 'public');
                    }
                    $validated[$key] = $paths;
                } else {
                    $validated[$key] = $request->file($key)->store('registration_files', 'public');
                }
            }
        }

        // 3. Simpan Data
        $user = User::create([
            'id_events' => $event->id,
            'status'    => 'belum hadir',
        ]);

        Registrasi::create([
            'id_user'             => $user->id,
            'id_event'            => $event->id,
            'custom_field_values' => $validated,
        ]);

        $token = Str::upper(Str::random(10));

        QrCode::create([
            'id_user'  => $user->id,
            'id_event' => $event->id,
            'qr_token' => $token,
            'is_used'  => false,
        ]);

        return redirect()->route('events.register.success', [
            'events' => $event->title_event,
            'token'  => $token
        ]);
    }

    /**
     * Helper Private untuk memetakan aturan berdasarkan tipe input
     */
    private function applyTypeRules(array $field, array &$rules): void
    {
        $type = $field['type'] ?? 'text';

        switch ($type) {
            case 'email':
                $rules[] = 'email';
                $rules[] = 'max:255';
                break;

            case 'phone':
            case 'tel':
                $rules[] = 'string';
                $rules[] = 'regex:/^\+?[0-9\s\-\.]+$/';
                $rules[] = 'max:30';
                break;

            case 'number':
                $rules[] = 'numeric';
                break;

            case 'date':
                $rules[] = 'date';
                break;

            case 'file':
                $rules[] = 'file';
                $rules[] = 'max:5120'; // Limit 5MB
                break;

            case 'select':
                $rules[] = 'string';
                if (!empty($field['options']) && is_array($field['options'])) {
                    $rules[] = 'in:' . implode(',', $field['options']);
                }
                break;

            case 'textarea':
                $rules[] = 'string';
                $rules[] = 'max:2000';
                break;

            default:
                $rules[] = 'string';
                $rules[] = 'max:255';
                break;
        }
    }

    public function success($events, string $token): Response
    {
        $event = Event::where('title_event', $events)->firstOrFail();
        $qr = QrCode::where('qr_token', $token)->where('id_event', $event->id)->firstOrFail();
        $user = $qr->user;
        $registrasi = $user->registrasi;

        // Set locale Carbon ke bahasa Indonesia khusus di fungsi ini
        Carbon::setLocale('id');

        // Ambil data yang diinput user
        $submittedValues = $registrasi->custom_field_values ?? [];

        // Ambil template field event (fallback ke default jika null)
        $fieldsTemplate = $event->custom_fields_template ?? [
            ['label' => 'Full Name', 'key' => 'full_name', 'type' => 'text', 'required' => true],
            ['label' => 'Email Address', 'key' => 'email', 'type' => 'email', 'required' => true],
            ['label' => 'Phone Number', 'key' => 'phone', 'type' => 'tel', 'required' => true],
            ['label' => 'Organization / Company', 'key' => 'organization', 'type' => 'text', 'required' => false],
            ['label' => 'Role / Title', 'key' => 'role', 'type' => 'text', 'required' => true],
        ];

        // Petakan template dengan nilai yang diinput user
        $attendeeDetails = [];
        foreach ($fieldsTemplate as $field) {
            $key = $field['key'];
            $rawVal = $submittedValues[$key] ?? null;

            // Format value jika berupa Array (Multi-Input)
            if (is_array($rawVal)) {
                // Filter elemen kosong
                $filteredVals = array_filter($rawVal, fn($v) => !is_null($v) && $v !== '');

                if (empty($filteredVals)) {
                    $formattedValue = '-';
                } elseif (count($filteredVals) === 1) {
                    $formattedValue = reset($filteredVals);
                } else {
                    // Menggabungkan array menjadi "data 1 & data 2" (atau "A, B & C" jika > 2 data)
                    $lastItem = array_pop($filteredVals);
                    $formattedValue = implode(', ', $filteredVals) . ' & ' . $lastItem;
                }
            } else {
                $formattedValue = $rawVal ?? '-';
            }

            $attendeeDetails[] = [
                'label' => $field['label'],
                'key'   => $key,
                'value' => $formattedValue,
            ];
        }

        return Inertia::render('Registration/Success', [
            'event' => [
                'id'              => $event->id,
                'title_event'     => $event->title_event,
                'hari' => $event->date_time_event?->locale('id')->translatedFormat('l'),
                'date_time_event' => $event->date_time_event?->format('d M Y'),
                'time' => $event->date_time_event?->format('H:i'),
                'venue'           => $event->venue,
            ],
            'attendeeDetails' => $attendeeDetails,
            'token'           => $qr->qr_token,
            'status'          => $qr->is_used ? 'confirmed' : 'pending',
        ]);
    }
}
