type DashboardFeatureHeaderProps = {
  title: string;
  onBack: () => void;
};

export function DashboardFeatureHeader({
  title,
  onBack,
}: DashboardFeatureHeaderProps) {
  return (
    <div className="feature-screen-head">
      <button className="ghost-btn feature-back-btn" onClick={onBack} type="button">
        Back to dashboard
      </button>
      <div>
        <p className="eyebrow">Student dashboard</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
