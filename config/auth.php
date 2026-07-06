<?php

use App\Models\Event;

return [

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'events'),
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'events',
        ],
    ],

    'providers' => [
        'events' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', Event::class),
        ],
    ],

    'passwords' => [
        'events' => [
            'provider' => 'events',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
];
