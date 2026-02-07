<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'register',
        'login',
        'logout',
        'user',
        'forgot-password',
        'reset-password'
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://itfreelance.netlify.app',
        // '*',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];