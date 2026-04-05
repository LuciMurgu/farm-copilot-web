"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRightRailStore, type RightRailTab } from "@/hooks/use-right-rail-store";

const TABS: { id: RightRailTab; label: string }[] = [
  { id: "alerte", label: "Alerte" },
  { id: "ai", label: "AI" },
  { id: "dovezi", label: "Dovezi" },
  { id: "istoric", label: "Istoric" },
];

/**
 * Right rail — slide-in from the right, 320px wide.
 * 200ms ease animation. Overlays content (does not push it).
 * Tabs: Alerte | AI | Dovezi | Istoric.
 */
export function RightRail() {
  const { isOpen, activeTab, selectedItemId, close, setTab } = useRightRailStore();

  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 animate-fade-in"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Rail panel */}
      <aside
        aria-label="Panou detalii"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 h-full w-[320px] bg-white border-l border-slate-200",
          "z-50 flex flex-col shadow-2xl",
          "transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center h-14 px-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 truncate">
              {selectedItemId ? (
                <span className="font-mono">{selectedItemId}</span>
              ) : (
                "Detalii"
              )}
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Închide panoul de detalii"
            className="ml-2 flex items-center justify-center w-7 h-7 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Secțiuni panou detalii"
          className="flex border-b border-slate-100 px-4 flex-shrink-0"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`rail-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`rail-panel-${tab.id}`}
              onClick={() => setTab(tab.id)}
              className={cn(
                "px-3 py-3 text-sm font-medium transition-colors border-b-2 -mb-px mr-1 last:mr-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-700",
                activeTab === tab.id
                  ? "border-brand-700 text-brand-700"
                  : "border-transparent text-slate-500 hover:text-slate-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div
          role="tabpanel"
          id={`rail-panel-${activeTab}`}
          aria-labelledby={`rail-tab-${activeTab}`}
          className="flex-1 overflow-y-auto p-4"
        >
          <RailContent tab={activeTab} itemId={selectedItemId} />
        </div>
      </aside>
    </>
  );
}

// ── Tab content placeholders (wired in by feature pages) ─────────────────────

function RailContent({
  tab,
  itemId,
}: {
  tab: RightRailTab;
  itemId: string | null;
}) {
  if (!itemId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-12">
        <p className="text-sm text-slate-400">Selectați un element</p>
        <p className="text-xs text-slate-300">
          Detaliile vor apărea aici.
        </p>
      </div>
    );
  }

  const labels: Record<RightRailTab, string> = {
    alerte: "Alerte pentru acest element",
    ai: "Detalii normalizare AI",
    dovezi: "Dovezi documentare",
    istoric: "Istoric corecții / export",
  };

  return (
    <div className="text-sm text-slate-500">
      <p className="font-medium text-slate-700 mb-2">{labels[tab]}</p>
      <p className="text-xs text-slate-400 font-mono">{itemId}</p>
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-lg bg-slate-50 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
