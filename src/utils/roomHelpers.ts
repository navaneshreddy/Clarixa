import type { RoomVisibility } from "../types";

export const formatVisibilityTone = (visibility: RoomVisibility) =>
  visibility === "Public" ? "tone-green" : "tone-amber";

export const generateRoomCode = (subject: string) =>
  `${subject.slice(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;
