import { landingActions, landingHighlights } from "../utils/landingContent";
import type { AuthMode } from "../types";

type AuthHeroProps = {
  authMode: AuthMode;
  onOpenForm: (mode: AuthMode) => void;
};

export function AuthHero({ authMode, onOpenForm }: AuthHeroProps) {
  return (
    <div className="hero-panel compact-hero">
      <div className="brand hero-brand">
        <div className="brand-mark">C</div>
        <div className="brand-copy">
          <h2>Clarixa</h2>
          <p>Study rooms built for mobile-first learning</p>
        </div>
      </div>

      <div className="landing-topbar">
        <div>
          <p className="eyebrow">Collaborative learning, not passive copying</p>
          <h1>Learn together in one focused flow.</h1>
        </div>
        <div className="landing-actions">
          <button
            className={authMode === "signin" ? "nav-item active" : "nav-item"}
            onClick={() => onOpenForm("signin")}
            type="button"
          >
            I have an account
          </button>
          <button
            className="primary-btn compact-btn"
            onClick={() => onOpenForm("signup")}
            type="button"
          >
            Create account
          </button>
        </div>
      </div>

      <p className="hero-copy compact-copy">
        Clarixa keeps rooms, doubts, AI sharing, streaks, and collaboration in a clean
        phone-style experience that still feels natural on laptop.
      </p>

      <div className="feature-action-row">
        {landingActions.map((action) => (
          <button key={action} className="feature-nav-btn" type="button">
            {action}
          </button>
        ))}
      </div>

      <div className="hero-grid compact-grid">
        {landingHighlights.map((item) => (
          <div className="glass-card compact-card" key={item.title}>
            <span>{item.title}</span>
            <strong>{item.description}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
