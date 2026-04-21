import type { Student, Tab } from "../types";

type TopbarProps = {
  activeTab: Tab;
  me: Student;
  setActiveTab: (tab: Tab) => void;
};

const tabs: Array<{ key: Tab; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "rooms", label: "Rooms" },
  { key: "explore", label: "Explore" },
  { key: "messages", label: "Messages" },
  { key: "profile", label: "Profile" },
];

export function Topbar({ activeTab, me, setActiveTab }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-row">
        <div className="brand topbar-brand">
          <div className="brand-mark">C</div>
          <div className="brand-copy">
            <h2>Clarixa</h2>
            <p>Student dashboard</p>
          </div>
        </div>

        <div className="profile-chip">
          <div className="avatar">{me.name[0]}</div>
          <div className="profile-copy">
            <strong>{me.name}</strong>
            <span>
              {me.badge} | {me.credits} credits
            </span>
          </div>
        </div>
      </div>

      <nav className="nav-list top-nav-list">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
