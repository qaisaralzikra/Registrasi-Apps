<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardControllers extends Controller
{
    public function index()
    {
        $event = auth()->user();

        $totalRegistrated = $event->users()->count();
        $totalScanned = \App\Models\QrCode::where('id_event', $event->id)
            ->where('is_used', true)
            ->count();
        $totalPending = \App\Models\QrCode::where('id_event', $event->id)
            ->where('is_used', false)
            ->count();

        $template = $event->custom_fields_template ?? [];
        $columns = collect($template)
            ->filter(fn($f) => $f['active'] ?? true)
            ->values()
            ->map(fn($f) => [
                'label' => $f['label'],
                'key'   => $f['key'],
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
                    $rawVal = $fields[$col['key']] ?? $fields[$col['label']] ?? null;

                    // Format jika data berupa Array (Multi-Input / Multiple Values)
                    if (is_array($rawVal)) {
                        $filteredVals = array_filter($rawVal, fn($v) => !is_null($v) && $v !== '');

                        if (empty($filteredVals)) {
                            $row[$col['key']] = '-';
                        } elseif (count($filteredVals) === 1) {
                            $row[$col['key']] = reset($filteredVals);
                        } else {
                            // Gabungkan array menjadi "data 1 & data 2" (atau "A, B & C")
                            $lastItem = array_pop($filteredVals);
                            $row[$col['key']] = implode(', ', $filteredVals) . ' & ' . $lastItem;
                        }
                    } else {
                        $row[$col['key']] = $rawVal ?? '-';
                    }
                }

                return [
                    'data'          => $row,
                    'id_registrasi' => $item->id,
                    'status'        => $item->is_used ? 'Hadir' : ($item->status === 'hadir' ? 'Hadir' : 'Belum Hadir'),
                    'timestamp'     => $item->created_at,
                ];
            });

        return inertia('Dashboard', [
            'event' => [
                'id'              => $event->id,
                'title_event'     => $event->title_event,
                'subtitle_event'  => $event->subtitle_event,
                'desc_event'      => $event->desc_event,
                'date_time_event' => $event->date_time_event?->format('Y-m-d H:i'),
                'venue'           => $event->venue,
            ],
            'stats' => [
                'total'     => $totalRegistrated,
                'confirmed' => $totalScanned,
                'pending'   => $totalPending,
            ],
            'columns'     => $columns,
            'registrants' => $registrants,
        ]);
    }
}
