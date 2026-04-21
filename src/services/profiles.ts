import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export type UserProfile = {
  email: string | null;
  fullName: string;
  focus: string;
  credits: number;
  streak: number;
};

type EnsureProfileInput = {
  uid: string;
  email: string | null;
  fullName?: string;
  focus?: string;
};

export async function ensureUserProfile({
  uid,
  email,
  fullName,
  focus,
}: EnsureProfileInput) {
  if (!isFirebaseConfigured || !db) {
    return;
  }

  const profileRef = doc(db, "users", uid);
  const existing = await getDoc(profileRef);

  if (existing.exists()) {
    return;
  }

  await setDoc(profileRef, {
    email,
    fullName: fullName?.trim() || "Clarixa Student",
    focus: focus?.trim() || "General Learning",
    credits: 0,
    streak: 0,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!isFirebaseConfigured || !db) {
    return null;
  }

  const profileRef = doc(db, "users", uid);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    email: typeof data.email === "string" ? data.email : null,
    fullName: typeof data.fullName === "string" ? data.fullName : "Clarixa Student",
    focus: typeof data.focus === "string" ? data.focus : "General Learning",
    credits: Number(data.credits ?? 0),
    streak: Number(data.streak ?? 0),
  };
}
