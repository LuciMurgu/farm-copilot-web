"use client";

/**
 * Dashboard page — Command Center.
 *
 * The farmer's first screen: what needs attention RIGHT NOW.
 * Not a KPI wall — it's a task list with smart prioritization.
 *
 * Prompt 05 from PROMPT_SEQUENCE.md
 */
import { useAuthStore } from "@/hooks/use-auth";
import { useAnafStatus } from "@/hooks/use-anaf-status";
import { useActionFeed } from "@/hooks/use-action-feed";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardStatsGrid } from "@/components/dashboard/stats-grid";
import { ActionFeedList } from "@/components/dashboard/action-feed-list";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { RelativeTime } from "@/components/shared/relative-time";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Wifi, WifiOff, Inbox } from "lucide-react";

function AnafSyncBadge() {
  const anaf = useAnafStatus();

  if (!anaf) {
    return (
      <Badge variant="outline" className="text-[11px] border-slate-200 text-slate-400 gap-1">
        <WifiOff className="h-3 w-3" />
        SPV neconfigurat
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`text-[11px] gap-1 ${
        anaf.connected
          ? "border-green-200 text-green-700 bg-green-50"
          : "border-red-200 text-red-700 bg-red-50"
      }`}
    >
      {anaf.connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {anaf.connected ? "SPV conectat" : "SPV deconectat"}
    </Badge>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bună dimineața";
  if (hour < 18) return "Bună ziua";
  return "Bună seara";
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const anaf = useAnafStatus();
  const { data: feed, isLoading: feedLoading } = useActionFeed();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const isLoading = feedLoading || statsLoading;

  const farmName = user?.farm_name ?? "Ferma dvs.";
  const farmArea = user?.farm_area_ha ?? 300;
  const farmLocation = user?.farm_location ?? "Iași";

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Panou principal"
        breadcrumbs={[{ label: "Panou principal" }]}
        actions={<AnafSyncBadge />}
      />

      <div className="flex-1 p-4 md:p-6 space-y-6 max-w-[1200px]">
        {/* ── Greeting ────────────────────────────────────────────── */}
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
            {getGreeting()}, {farmName}
          </h2>
          <p className="text-sm text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{farmArea} ha</span>
            <span className="text-slate-300">·</span>
            <span>{farmLocation}</span>
            {anaf?.last_sync && (
              <>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1">
                  Ultimul sync SPV:{" "}
                  <RelativeTime
                    date={anaf.last_sync}
                    className="font-medium text-slate-700"
                  />
                </span>
              </>
            )}
          </p>
        </div>

        {/* ── Stats Cards ─────────────────────────────────────────── */}
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {stats && <DashboardStatsGrid stats={stats} />}

            {/* ── Action Feed ───────────────────────────────────── */}
            {feed && feed.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Acțiuni necesare
                </h3>
                <ActionFeedList items={feed} />
              </div>
            ) : (
              <EmptyState
                icon={feed?.length === 0 ? CheckCircle2 : Inbox}
                title="Totul este în regulă"
                description="Nicio acțiune necesară. Sistemul monitorizează facturile, stocul și alertele pentru dvs."
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
