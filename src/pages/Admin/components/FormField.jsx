import React from "react";

export function FormField({ label, children, hint }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${className}`}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 3, className = "" }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-y ${className}`}
    />
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-orange-500" : "bg-gray-300"}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export function JsonArrayEditor({ value = [], onChange, placeholder = "Ajouter un élément..." }) {
  const items = Array.isArray(value) ? value : [];

  function add() {
    onChange([...items, ""]);
  }

  function update(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={typeof item === "string" ? item : JSON.stringify(item)}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-400 hover:text-red-600 text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-orange-500 hover:text-orange-700 text-sm font-medium"
      >
        + {placeholder}
      </button>
    </div>
  );
}
