type DashboardFeatureMenuProps = {
  features: Array<{
    key: string;
    eyebrow: string;
    title: string;
    description: string;
    meta: string;
  }>;
  onOpenFeature: (feature: string) => void;
};

export function DashboardFeatureMenu({
  features,
  onOpenFeature,
}: DashboardFeatureMenuProps) {
  return (
    <div className="content-stack">
      <section className="dashboard-menu-card">
        <p className="eyebrow">Student dashboard</p>
        <h2>Choose one feature and stay focused.</h2>
        <p className="muted compact-banner-copy">
          This dashboard keeps only the most important actions. Open one feature at a time so the
          screen feels clearer on mobile.
        </p>
      </section>

      <section className="dashboard-feature-list">
        {features.map((feature) => (
          <button
            key={feature.key}
            className="feature-launcher"
            onClick={() => onOpenFeature(feature.key)}
            type="button"
          >
            <div>
              <p className="eyebrow">{feature.eyebrow}</p>
              <h3>{feature.title}</h3>
              <p className="muted">{feature.description}</p>
            </div>
            <span className="feature-launcher-meta">{feature.meta}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
