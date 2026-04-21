import { useEffect, useMemo, useState } from "react";
import { initialMessages, initialPosts, initialRooms, students } from "../services/mockData";
import { initializeAnalytics, isFirebaseConfigured } from "../services/firebase";
import { listenToAuthChanges, signInWithEmail, signOutUser, signUpWithEmail } from "../services/auth";
import { getUserProfile } from "../services/profiles";
import { createRoomInFirestore, subscribeToRooms } from "../services/rooms";
import type {
  AuthCredentials,
  DashboardStat,
  JoinRoomForm,
  NewPostForm,
  NewRoomForm,
  Post,
  Room,
  Tab,
} from "../types";
import { generateRoomCode } from "../utils/roomHelpers";
import { createCurrentUser } from "../utils/currentUser";

export function useClarixaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof createCurrentUser> | null>(null);
  const [authMessage, setAuthMessage] = useState("");
  const [joinRoom, setJoinRoom] = useState<JoinRoomForm>({ code: "" });
  const [joinRoomStatus, setJoinRoomStatus] = useState("");
  const [newRoom, setNewRoom] = useState<NewRoomForm>({
    name: "",
    subject: "",
    visibility: "Public",
  });
  const [newPost, setNewPost] = useState<NewPostForm>({
    title: "",
    content: "",
    room: initialRooms[0].name,
    type: "Doubt",
  });

  const messages = initialMessages;

  const me = useMemo(
    () => ({
      id: 0,
      name: currentUser?.name || "Student",
      username: currentUser?.username || "@student",
      focus: currentUser?.focus || "General Learning",
      streak: currentUser?.streak ?? 0,
      credits: currentUser?.credits ?? 0,
      rooms: rooms.length,
      posts: posts.length,
      badge: currentUser?.badge || "New Member",
      status: currentUser?.status || "Online",
    }),
    [currentUser, posts.length, rooms.length],
  );

  useEffect(() => {
    void initializeAnalytics();

    let cancelled = false;
    let unsubscribeAuth: (() => void) | undefined;

    void (async () => {
      if (isFirebaseConfigured) {
        // Force an explicit sign-in each time the app opens (prevents auto-landing on
        // the workspace due to Firebase session restoration).
        await signOutUser();
      }

      if (cancelled) {
        return;
      }

      unsubscribeAuth = listenToAuthChanges((user) => {
        void (async () => {
          if (user) {
            setIsLoggedIn(true);
            setAuthMessage("Signed in with Firebase.");

            const profile = await getUserProfile(user.uid);
            setCurrentUser(
              createCurrentUser({
                fullName: profile?.fullName || user.displayName || undefined,
                focus: profile?.focus,
                email: profile?.email || user.email,
                credits: profile?.credits,
                streak: profile?.streak,
              }),
            );
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        })();
      });
    })();

    const unsubscribeRooms = subscribeToRooms((firebaseRooms) => {
      if (firebaseRooms.length > 0) {
        setRooms(firebaseRooms);
      }
    });

    return () => {
      cancelled = true;
      unsubscribeAuth?.();
      unsubscribeRooms();
    };
  }, []);

  const stats = useMemo<DashboardStat[]>(
    () => [
      {
        label: "Active streak",
        value: `${me.streak} days`,
        hint: "Daily learning rhythm with peer participation.",
      },
      {
        label: "Credits earned",
        value: `${me.credits}`,
        hint: "Unlocked by helping, posting, and thoughtful AI usage.",
      },
      {
        label: "Shared solutions",
        value: `${posts.length}`,
        hint: "Explanations, doubts, and AI-assisted room knowledge.",
      },
      {
        label: "Live rooms",
        value: `${rooms.length}`,
        hint: "Public and private communities with room codes.",
      },
    ],
    [me.credits, me.streak, posts.length, rooms.length],
  );

  const createRoom = () => {
    if (!newRoom.name.trim() || !newRoom.subject.trim()) {
      setJoinRoomStatus("");
      return;
    }

    const room: Room = {
      id: rooms.length + 1,
      name: newRoom.name.trim(),
      subject: newRoom.subject.trim(),
      visibility: newRoom.visibility,
      members: 1,
      activeNow: 1,
      code: generateRoomCode(newRoom.subject),
      description:
        "A new collaborative study room focused on active discussion, shared doubts, and collective problem solving.",
      tags: ["New Room", "Collaboration", newRoom.subject.trim()],
      pinnedQuestion: "What should this room solve together first?",
    };

    if (isFirebaseConfigured) {
      void createRoomInFirestore(room);
      setJoinRoomStatus(`Room created with code ${room.code}. It will sync from Firebase.`);
    } else {
      setRooms([room, ...rooms]);
      setJoinRoomStatus(`Room created locally. Share code ${room.code} to invite others.`);
    }

    setNewRoom({ name: "", subject: "", visibility: "Public" });
    setActiveTab("rooms");
  };

  const joinExistingRoom = () => {
    const code = joinRoom.code.trim().toUpperCase();

    if (!code) {
      setJoinRoomStatus("Enter a room code to join.");
      return;
    }

    const matchedRoom = rooms.find((room) => room.code.toUpperCase() === code);

    if (!matchedRoom) {
      setJoinRoomStatus(`No room found for code ${code}.`);
      return;
    }

    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === matchedRoom.id ? { ...room, members: room.members + 1 } : room,
      ),
    );
    setJoinRoomStatus(`Joined ${matchedRoom.name}. You can now discuss inside that room.`);
    setJoinRoom({ code: "" });
    setActiveTab("rooms");
  };

  const submitPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      author: me.name,
      role: "You",
      type: newPost.type,
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      room: newPost.room,
      likes: 0,
      replies: 0,
      aiShared: newPost.type === "AI Assist",
      tags:
        newPost.type === "AI Assist"
          ? ["Shared AI", "Discussion Starter"]
          : ["Student Post", "Clarixa"],
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: "",
      content: "",
      room: newPost.room,
      type: "Doubt",
    });
    setActiveTab("dashboard");
  };

  const handleSignUp = async (credentials: AuthCredentials) => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setAuthMessage("Email and password are required.");
      return;
    }

    if (!isFirebaseConfigured) {
      setAuthMessage("Firebase is not configured yet, so Clarixa opened in local prototype mode.");
      setCurrentUser(
        createCurrentUser({
          fullName: credentials.fullName,
          focus: credentials.focus,
          email: credentials.email,
        }),
      );
      setIsLoggedIn(true);
      return;
    }

    try {
      await signUpWithEmail(credentials.email, credentials.password, {
        fullName: credentials.fullName,
        focus: credentials.focus,
      });
      setAuthMessage("Account created successfully with Firebase.");
      setIsLoggedIn(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign up right now.";
      setAuthMessage(message);
    }
  };

  const handleSignIn = async (credentials: AuthCredentials) => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setAuthMessage("Email and password are required.");
      return;
    }

    if (!isFirebaseConfigured) {
      setAuthMessage("Firebase is not configured yet, so Clarixa opened in local prototype mode.");
      setCurrentUser(
        createCurrentUser({
          email: credentials.email,
        }),
      );
      setIsLoggedIn(true);
      return;
    }

    try {
      await signInWithEmail(credentials.email, credentials.password);
      setAuthMessage("Welcome back. Firebase sign in successful.");
      setIsLoggedIn(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in right now.";
      setAuthMessage(message);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthMessage("");
  };

  return {
    activeTab,
    authMessage,
    isLoggedIn,
    joinRoom,
    joinRoomStatus,
    me,
    messages,
    newPost,
    newRoom,
    onCreateRoom: createRoom,
    onJoinRoom: joinExistingRoom,
    onLogout: handleLogout,
    onSignIn: handleSignIn,
    onSignUp: handleSignUp,
    onSubmitPost: submitPost,
    posts,
    rooms,
    setActiveTab,
    setJoinRoom,
    setNewPost,
    setNewRoom,
    stats,
    students,
  };
}
