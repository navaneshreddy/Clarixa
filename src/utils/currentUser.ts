import type { CurrentUser } from "../types";

type CreateCurrentUserInput = {
  fullName?: string;
  focus?: string;
  email?: string | null;
  credits?: number;
  streak?: number;
};

export const formatNameFromEmail = (email?: string) => {
  const source = email?.split("@")[0] ?? "student";

  return (
    source
      .replace(/[._-]+/g, " ")
      .trim()
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Student"
  );
};

export const createCurrentUser = ({
  fullName,
  focus,
  email,
  credits = 0,
  streak = 0,
}: CreateCurrentUserInput): CurrentUser => {
  const resolvedName = fullName?.trim() || formatNameFromEmail(email ?? undefined);
  const handleSource = email?.split("@")[0] || resolvedName;
  const username =
    "@" +
    handleSource
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .trim();

  return {
    name: resolvedName,
    username: username === "@" ? "@student" : username,
    focus: focus?.trim() || "General Learning",
    streak,
    credits,
    badge: credits > 0 ? "Active Learner" : "New Member",
    status: "Online",
  };
};
