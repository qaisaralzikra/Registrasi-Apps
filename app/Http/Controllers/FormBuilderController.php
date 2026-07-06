<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormBuilderController extends Controller
{
    public function index()
    {
        $event = auth()->user();

        return Inertia::render('FormBuilder', [
            'template' => $event->custom_fields_template ?? [],
        ]);
    }

    public function update(Request $request)
    {
        $event = auth()->user();

        $validated = $request->validate([
            'template' => ['required', 'array'],
            'template.*.label' => ['required', 'string', 'max:255'],
            'template.*.key' => ['required', 'string', 'max:255'],
            'template.*.type' => ['required', 'string', 'in:text,email,phone,textarea,select,number,date,file'],
            'template.*.required' => ['required', 'boolean'],
            'template.*.active' => ['required', 'boolean'],
            'template.*.options' => ['nullable', 'array'],
        ]);

        $event->custom_fields_template = $validated['template'];
        $event->save();

        return back()->with('status', 'Form template saved successfully.');
    }
}
