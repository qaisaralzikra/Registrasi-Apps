import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'file', label: 'File' },
];

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
}

const typeIcons = {
    text: 'T',
    email: '@',
    phone: '📞',
    textarea: '¶',
    select: '≡',
    number: '#',
    date: '📅',
    file: '⬆',
};

export default function FormBuilder({ template: initialTemplate }) {
    const [fields, setFields] = useState(initialTemplate ?? []);
    const [newLabel, setNewLabel] = useState('');
    const [newType, setNewType] = useState('text');
    const [newRequired, setNewRequired] = useState(false);
    const [newOptions, setNewOptions] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const activeCount = fields.filter((f) => f.active).length;

    function addField() {
        if (!newLabel.trim()) return;

        const key = slugify(newLabel);
        if (fields.some((f) => f.key === key)) return;

        setFields([
            ...fields,
            {
                label: newLabel.trim(),
                key,
                type: newType,
                required: newRequired,
                active: true,
                options: newType === 'select' && newOptions.trim()
                    ? newOptions.split(',').map((o) => o.trim()).filter(Boolean)
                    : null,
            },
        ]);

        setNewLabel('');
        setNewType('text');
        setNewRequired(false);
        setNewOptions('');
        setSaved(false);
    }

    function removeField(index) {
        setFields(fields.filter((_, i) => i !== index));
        setSaved(false);
    }

    function toggleActive(index) {
        setFields(
            fields.map((f, i) => (i === index ? { ...f, active: !f.active } : f)),
        );
        setSaved(false);
    }

    function moveField(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= fields.length) return;
        const next = [...fields];
        [next[index], next[target]] = [next[target], next[index]];
        setFields(next);
        setSaved(false);
    }

    function saveTemplate() {
        setSaving(true);

        router.post(route('form.builder.update'), {
            template: fields,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSaved(true);
                setSaving(false);
            },
            onError: () => {
                setSaving(false);
            },
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('dashboard')}
                        className="rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                    >
                        ← Back
                    </Link>
                    <div>
                        <h2 className="text-3xl font-semibold text-white">
                            Form Builder
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Form Builder" />

            <div className="px-6 py-8">
                <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    Registration Fields
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    {activeCount} active of {fields.length}
                                </p>
                            </div>
                            <button
                                onClick={saveTemplate}
                                disabled={saving}
                                className="rounded-3xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save'}
                            </button>
                        </div>

                        {fields.length === 0 && (
                            <p className="mt-8 text-center text-sm text-slate-500">
                                No fields yet. Add one from the panel on the right.
                            </p>
                        )}

                        <div className="mt-6 space-y-4">
                            {fields.map((field, index) => (
                                <div
                                    key={field.key}
                                    className={
                                        'flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 transition ' +
                                        (field.active
                                            ? 'shadow-[0_20px_50px_-30px_rgba(15,23,42,0.8)]'
                                            : 'opacity-70')
                                    }
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-lg text-slate-300">
                                            {typeIcons[field.type] ?? 'T'}
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-white">
                                                {field.label}{' '}
                                                {field.required && (
                                                    <span className="text-sm font-medium text-rose-400">required</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {field.type} · {field.key}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => moveField(index, -1)}
                                            disabled={index === 0}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-white disabled:opacity-30"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => moveField(index, 1)}
                                            disabled={index === fields.length - 1}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-white disabled:opacity-30"
                                        >
                                            ↓
                                        </button>
                                        <button
                                            onClick={() => toggleActive(index)}
                                            className={
                                                'inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ' +
                                                (field.active
                                                    ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                                                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700')
                                            }
                                        >
                                            {field.active ? '✓' : '○'}
                                        </button>
                                        <button
                                            onClick={() => removeField(index)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                            <h3 className="text-xl font-semibold text-white">
                                Add New Field
                            </h3>
                            <div className="mt-5 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                                        Label
                                    </label>
                                    <input
                                        type="text"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                        placeholder="Field label..."
                                        className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                    />
                                    {newLabel && (
                                        <p className="mt-1 text-xs text-slate-500">
                                            Key: {slugify(newLabel)}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                                        Type
                                    </label>
                                    <select
                                        value={newType}
                                        onChange={(e) => setNewType(e.target.value)}
                                        className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                    >
                                        {fieldTypes.map((t) => (
                                            <option key={t.value} value={t.value}>
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {newType === 'select' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                                            Options (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={newOptions}
                                            onChange={(e) => setNewOptions(e.target.value)}
                                            placeholder="Option 1, Option 2, Option 3"
                                            className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                        />
                                    </div>
                                )}
                                <label className="flex items-center gap-3 text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={newRequired}
                                        onChange={(e) => setNewRequired(e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-violet-500 focus:ring-violet-500"
                                    />
                                    Required field
                                </label>
                                <button
                                    onClick={addField}
                                    disabled={!newLabel.trim()}
                                    className="w-full rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    + Add Field
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                            <h3 className="text-xl font-semibold text-white">
                                Active Fields
                            </h3>
                            {fields.filter((f) => f.active).length === 0 ? (
                                <p className="mt-5 text-sm text-slate-500">No active fields.</p>
                            ) : (
                                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                                    {fields
                                        .filter((f) => f.active)
                                        .map((field) => (
                                            <li
                                                key={field.key}
                                                className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3"
                                            >
                                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                                                    ✓
                                                </span>
                                                <span>
                                                    {field.label}
                                                    {field.required ? ' *' : ''}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
