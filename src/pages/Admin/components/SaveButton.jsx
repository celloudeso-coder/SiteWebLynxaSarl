import React from "react";
import { Check, Loader2 } from "lucide-react";

export default function SaveButton({ loading, saved, onClick, label = "Enregistrer" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${saved
          ? "bg-green-500 text-white"
          : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"}`}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {saved && !loading && <Check size={15} />}
      {saved && !loading ? "Enregistré !" : label}
    </button>
  );
}
