<?php

use App\Models\Event;

beforeEach(function () {
    $this->event = Event::factory()->create([
        'title_event' => 'DevSummit 2025',
        'password' => 'secret123',
    ]);
});

test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('events can authenticate using the login screen', function () {
    $response = $this->post('/login', [
        'title_event' => 'DevSummit 2025',
        'password' => 'secret123',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('events can not authenticate with invalid password', function () {
    $this->post('/login', [
        'title_event' => 'DevSummit 2025',
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('events can logout', function () {
    $response = $this->actingAs($this->event)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
