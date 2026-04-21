import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";
import { ensureUserProfile } from "./profiles";

export function listenToAuthChanges(callback: (user: User | null) => void) {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  profile?: { fullName?: string; focus?: string },
) {
  if (!isFirebaseConfigured || !auth) {
    return null;
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserProfile({
    uid: credential.user.uid,
    email: credential.user.email,
    fullName: profile?.fullName,
    focus: profile?.focus,
  });
  return credential;
}

export async function signInWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured || !auth) {
    return null;
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  if (!isFirebaseConfigured || !auth) {
    return;
  }

  await signOut(auth);
}
