import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import type { Room } from "../types";

const COLLECTION_NAME = "rooms";

export function subscribeToRooms(callback: (rooms: Room[]) => void) {
  if (!isFirebaseConfigured || !db) {
    return () => undefined;
  }

  const roomsQuery = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));

  return onSnapshot(roomsQuery, (snapshot) => {
    const mappedRooms = snapshot.docs.map((doc, index) => {
      const data = doc.data();

      return {
        id: Number(doc.id.replace(/\D/g, "")) || index + 1,
        name: String(data.name ?? "Untitled Room"),
        subject: String(data.subject ?? "General"),
        visibility: data.visibility === "Private" ? "Private" : "Public",
        members: Number(data.members ?? 1),
        activeNow: Number(data.activeNow ?? 1),
        code: String(data.code ?? "ROOM000"),
        description: String(data.description ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        pinnedQuestion: String(data.pinnedQuestion ?? ""),
      } satisfies Room;
    });

    callback(mappedRooms);
  });
}

export async function createRoomInFirestore(room: Room) {
  if (!isFirebaseConfigured || !db) {
    return;
  }

  await addDoc(collection(db, COLLECTION_NAME), {
    ...room,
    createdAt: serverTimestamp(),
  });
}
