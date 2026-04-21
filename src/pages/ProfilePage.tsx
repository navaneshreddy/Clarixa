import type { Student } from "../types";

type ProfilePageProps = {
  me: Student;
  onLogout: () => void;
};

export function ProfilePage({ me, onLogout }: ProfilePageProps) {
  return (
    <div className="content-stack">
      <section className="sidebar-card sidebar-head">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <h2>Clarixa</h2>
            <p>Phone-style study flow</p>
          </div>
        </div>

        <button className="ghost-btn" onClick={onLogout} type="button">
          Logout
        </button>
      </section>

      <section className="profile-grid">
        <article className="panel-card">
          <p className="eyebrow">Your profile</p>
          <h2>{me.name}</h2>
          <p className="muted">{me.focus}</p>
          <div className="profile-metrics">
            <div>
              <strong>{me.streak}</strong>
              <span>Streak</span>
            </div>
            <div>
              <strong>{me.credits}</strong>
              <span>Credits</span>
            </div>
            <div>
              <strong>{me.rooms}</strong>
              <span>Rooms</span>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <p className="eyebrow">Gamification system</p>
          <h3>How students grow inside Clarixa</h3>
          <div className="feature-list">
            <div className="feature-item">
              Daily streaks increase when you post, reply, or help resolve a doubt.
            </div>
            <div className="feature-item">
              Credits are earned for useful solutions, AI summaries shared back to the room, and
              collaboration.
            </div>
            <div className="feature-item">
              Badges highlight explainers, discussion leaders, and consistent contributors.
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
