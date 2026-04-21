import type { AuthCredentials, AuthMode } from "../types";

type AuthFormPanelProps = {
  authMode: AuthMode;
  authMessage: string;
  firebaseReady: boolean;
  form: AuthCredentials;
  setAuthMode: (mode: AuthMode) => void;
  setForm: (form: AuthCredentials) => void;
  onHideForm: () => void;
  onSubmit: () => Promise<void>;
};

export function AuthFormPanel({
  authMode,
  authMessage,
  firebaseReady,
  form,
  setAuthMode,
  setForm,
  onHideForm,
  onSubmit,
}: AuthFormPanelProps) {
  return (
    <div className="auth-card compact-auth-card">
      <div>
        <p className="eyebrow">Start here</p>
        <h2>{authMode === "signup" ? "Create your student space" : "Sign in to continue"}</h2>
        <p className="muted">
          {authMode === "signup"
            ? "Set up your profile once and jump into a mobile-style dashboard built for discussion."
            : "Pick up your rooms, shared ideas, and active streaks in a few seconds."}
        </p>
        <p className="status-copy">
          {firebaseReady
            ? "Firebase is connected and ready."
            : "Firebase keys are not added yet, so auth opens the local prototype."}
        </p>
      </div>

      <div className="auth-switcher">
        <button
          className={authMode === "signin" ? "auth-switch active" : "auth-switch"}
          onClick={() => setAuthMode("signin")}
          type="button"
        >
          Sign in
        </button>
        <button
          className={authMode === "signup" ? "auth-switch active" : "auth-switch"}
          onClick={() => setAuthMode("signup")}
          type="button"
        >
          Sign up
        </button>
      </div>

      {authMode === "signin" ? (
        <div className="auth-form compact-form">
          <label>
            Email
            <input
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            Password
            <input
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="primary-btn" onClick={onSubmit} type="button">
            Enter Clarixa
          </button>
        </div>
      ) : (
        <div className="auth-form compact-form two-column-form">
          <label>
            Full name
            <input
              placeholder="Your full name"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
          </label>
          <label>
            Learning focus
            <input
              placeholder="JEE Physics, NEET Biology..."
              value={form.focus}
              onChange={(event) => setForm({ ...form, focus: event.target.value })}
            />
          </label>
          <label className="wide-field">
            Email
            <input
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label className="wide-field">
            Password
            <input
              placeholder="Create a secure password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="primary-btn wide-field" onClick={onSubmit} type="button">
            Create my account
          </button>
        </div>
      )}

      <button className="ghost-btn auth-hide-btn" onClick={onHideForm} type="button">
        Back
      </button>

      {authMessage ? <div className="notice-card">{authMessage}</div> : null}

      <div className="auth-footer compact-footer">
        <span>Rooms</span>
        <span>AI share</span>
        <span>Quick join</span>
        <span>Home feed</span>
      </div>
    </div>
  );
}
