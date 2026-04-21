import { useState } from "react";
import { AuthFormPanel } from "../components/AuthFormPanel";
import { AuthHero } from "../components/AuthHero";
import type { AuthCredentials, AuthMode } from "../types";

type AuthPageProps = {
  firebaseReady: boolean;
  authMessage: string;
  onSignIn: (credentials: AuthCredentials) => Promise<void>;
  onSignUp: (credentials: AuthCredentials) => Promise<void>;
};

export function AuthPage({
  firebaseReady,
  authMessage,
  onSignIn,
  onSignUp,
}: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState<AuthCredentials>({
    email: "",
    password: "",
    fullName: "",
    focus: "",
  });

  const openForm = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  const submit = async () => {
    if (authMode === "signin") {
      await onSignIn({ email: form.email, password: form.password });
      return;
    }

    await onSignUp(form);
  };

  return (
    <section className="auth-layout">
      {isFormVisible ? (
        <AuthFormPanel
          authMode={authMode}
          authMessage={authMessage}
          firebaseReady={firebaseReady}
          form={form}
          setAuthMode={setAuthMode}
          setForm={setForm}
          onHideForm={hideForm}
          onSubmit={submit}
        />
      ) : (
        <AuthHero authMode={authMode} onOpenForm={openForm} />
      )}
    </section>
  );
}
