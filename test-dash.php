<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Find a user
$user = App\Models\User::first();

// Create request
$request = Illuminate\Http\Request::create('/dashboard', 'GET');
$request->headers->set('X-Inertia', 'true');
$request->headers->set('X-Inertia-Version', '1');

// Login
$app->make('auth')->login($user);

// Handle request
$response = $kernel->handle($request);
echo "STATUS: " . $response->getStatusCode() . "\n";
echo substr($response->getContent(), 0, 500) . "\n";
