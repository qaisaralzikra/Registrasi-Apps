<?php

use App\Http\Controllers\DashboardControllers;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FormBuilderController;
use App\Http\Controllers\RegistrationController;
use App\Models\QrCode;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardControllers::class, 'index'])->name('dashboard');

    Route::get('/form-builder', [FormBuilderController::class, 'index'])->name('form.builder');
    Route::post('/form-builder/update', [FormBuilderController::class, 'update'])->name('form.builder.update');

    // Route untuk menampilkan halaman scanner
    Route::get('/qr-scanner', function () {
        return Inertia::render('QrScanner');
    })->name('qr.scanner');

    // Route untuk memproses verifikasi token QR
    Route::post('/qr-scanner/verify', function (Request $request) {
        $request->validate([
            'token' => 'required|string',
        ]);

        // Cari data berdasarkan token
        $qrCode = QrCode::where('qr_token', $request->token)->first();

        if (!$qrCode) {
            return back()->with('error', 'Invalid QR Token or Ticket not found!');
        }

        if ($qrCode->is_used) {
            return back()->with('warning', 'This ticket has already been used!');
        }

        // Ubah status is_used menjadi true
        $qrCode->update([
            'is_used' => true,
        ]);

        return back()->with('success', 'Ticket successfully verified and checked-in!');
    })->name('qr.verify');
});

Route::get('/user/{event}', [EventController::class, 'user'])->name('user');

Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
Route::post('/events', [EventController::class, 'store'])->name('events.store');

Route::get('/events/{events}/register', [RegistrationController::class, 'create'])->name('events.register');
Route::post('/events/{events}/register', [RegistrationController::class, 'store'])->name('events.register.store');
Route::get('/events/{events}/register/success/{token}', [RegistrationController::class, 'success'])->name('events.register.success');

require __DIR__ . '/auth.php';
