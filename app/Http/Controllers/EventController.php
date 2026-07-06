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
