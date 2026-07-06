<?php

use App\Http\Controllers\DashboardControllers;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FormBuilderController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => '13.x',
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardControllers::class, 'index'])->name('dashboard');

    Route::get('/form-builder', [FormBuilderController::class, 'index'])->name('form.builder');
    Route::post('/form-builder/update', [FormBuilderController::class, 'update'])->name('form.builder.update');

    Route::get('/qr-scanner', function () {
        return Inertia::render('QrScanner');
    })->name('qr.scanner');
});

Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
Route::post('/events', [EventController::class, 'store'])->name('events.store');

Route::get('/events/{event}/register', [RegistrationController::class, 'create'])->name('events.register');
Route::post('/events/{event}/register', [RegistrationController::class, 'store'])->name('events.register.store');
Route::get('/events/{event}/register/success/{token}', [RegistrationController::class, 'success'])->name('events.register.success');

require __DIR__ . '/auth.php';
