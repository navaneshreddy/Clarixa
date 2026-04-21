import type { DashboardStat } from "../../types";

type DashboardProgressGridProps = {
  stats: DashboardStat[];
};

export function DashboardProgressGrid({ stats }: DashboardProgressGridProps) {
  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
          <span>{stat.hint}</span>
        </article>
      ))}
    </section>
  );
}
