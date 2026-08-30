<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Event/Create');
    }

    public function user($event): Response
    {
        $event = Event::where('title_event', $event)->first();

        return inertia('Event/User', [
            'event' => [
                'id' => $event->id,
                'title_event' => $event->title_event,
                'subtitle_event' => $event->subtitle_event,
                'desc_event' => $event->desc_event,
                'hari' => $event->date_time_event?->translatedFormat('l'), // Contoh: Sabtu
                'date' => $event->date_time_event?->format('d M Y'),        // Contoh: 26 Jul 2025
                'time' => $event->date_time_event?->format('H:i'),          // Contoh: 08:00 (dalam format 24 jam)
                'venue' => $event->venue,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_event' => ['required', 'string', 'max:255'],
            'subtitle_event' => ['nullable', 'string', 'max:255'],
            'desc_event' => ['nullable', 'string'],
            'date_time_event' => ['nullable', 'date'],
            'venue' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        Event::create($validated);

        return redirect()->route('login')->with('status', 'Event created successfully. Please login with your event name and password.');
    }
}
