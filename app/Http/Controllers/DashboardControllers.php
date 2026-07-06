<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardControllers extends Controller
{
    public function index()
    {
        $event = auth()->user();

        $totalRegistrated = $event->users()->count();
        $totalConfirmed = $event->users()->where('status', 'hadir')->count();
        $totalPending = $event->users()->where('status', 'belum hadir')->count();

        $template = $event->custom_fields_template ?? [];
        $columns = collect($template)
            ->filter(fn ($f) => $f['active'] ?? true)
            ->values()
            ->map(fn ($f) => [
                'label' => $f['label'],
                'key' => $f['key'],
            ]);

        $registrants = DB::table('users')
            ->join('registrasi', 'users.id', '=', 'registrasi.id_user')
            ->leftJoin('qr_codes', 'users.id', '=', 'qr_codes.id_user')
            ->where('users.id_events', $event->id)
            ->select(
                'users.id',
                'users.status',
                'users.created_at',
                'registrasi.custom_field_values',
                'qr_codes.is_used'
            )
            ->orderBy('users.created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($item) use ($columns) {
                $fields = json_decode($item->custom_field_values, true) ?? [];

                $row = [];
                foreach ($columns as $col) {
                    $row[$col['key']] = $fields[$col['key']] ?? $fields[$col['label']] ?? '-';
                }

                return [
                    'data' => $row,
                    'status' => $item->is_used ? 'confirmed' : ($item->status === 'hadir' ? 'confirmed' : 'pending'),
                    'timestamp' => $item->created_at,
                ];
            });

        return inertia('Dashboard', [
            'event' => [
                'id' => $event->id,
                'title_event' => $event->title_event,
                'subtitle_event' => $event->subtitle_event,
                'desc_event' => $event->desc_event,
                'date_time_event' => $event->date_time_event?->format('Y-m-d H:i'),
                'venue' => $event->venue,
            ],
            'stats' => [
                'total' => $totalRegistrated,
                'confirmed' => $totalConfirmed,
                'pending' => $totalPending,
            ],
            'columns' => $columns,
            'registrants' => $registrants,
        ]);
    }
}
