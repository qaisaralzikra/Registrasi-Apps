<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        return [
            'title_event' => fake()->unique()->words(3, true),
            'subtitle_event' => fake()->sentence(4),
            'desc_event' => fake()->paragraph(),
            'date_time_event' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'venue' => fake()->city(),
            'password' => 'password',
        ];
    }
}
