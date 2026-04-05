/**
 * Dashboard page — Panou principal
 * Placeholder for Prompt 05. Uses PageHeader to demonstrate
 * that the shell renders correctly and the header API works.
 */
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Panou principal" };

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Panou principal"
        breadcrumbs={[{ label: "Panou principal" }]}
      />
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Facturi nevalidate", "Alerte active", "Valoare stoc"].map((label) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-3"
            >
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {label}
              </p>
              <div className="h-7 w-24 rounded bg-slate-100 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-400">
          Dashboard complet — implementat în Prompt 05
        </div>
      </div>
    </div>
  );
}
