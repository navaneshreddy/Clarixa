import type { Message, Post, Room, Student } from "../types";

export const students: Student[] = [
  {
    id: 1,
    name: "Aarav Menon",
    username: "@aaravbuilds",
    focus: "Physics + JEE",
    streak: 16,
    credits: 1240,
    rooms: 6,
    posts: 42,
    badge: "Insight Leader",
    status: "Online",
  },
  {
    id: 2,
    name: "Nithya Rao",
    username: "@nithya.notes",
    focus: "Biology + NEET",
    streak: 12,
    credits: 1015,
    rooms: 4,
    posts: 35,
    badge: "Explainer",
    status: "Studying",
  },
  {
    id: 3,
    name: "Karthik Sai",
    username: "@karthikcodes",
    focus: "Math + Olympiad",
    streak: 10,
    credits: 940,
    rooms: 5,
    posts: 29,
    badge: "Problem Solver",
    status: "Online",
  },
];

export const initialRooms: Room[] = [
  {
    id: 1,
    name: "Quantum Circle",
    subject: "Physics",
    visibility: "Public",
    members: 84,
    activeNow: 14,
    code: "QTM247",
    description:
      "A collaborative room for tough mechanics, waves, and conceptual JEE-level discussions.",
    tags: ["Mechanics", "Concept Building", "Peer Debate"],
    pinnedQuestion: "How do we visualize work-energy theorem beyond formulas?",
  },
  {
    id: 2,
    name: "Bio Recall Lab",
    subject: "Biology",
    visibility: "Private",
    members: 29,
    activeNow: 6,
    code: "BIO819",
    description:
      "Private group for NEET revision, doubt clearing, and quick explanation sharing.",
    tags: ["Revision", "NEET", "Mnemonics"],
    pinnedQuestion: "What is the fastest way to remember plant tissues logically?",
  },
  {
    id: 3,
    name: "Proof Forge",
    subject: "Mathematics",
    visibility: "Public",
    members: 61,
    activeNow: 11,
    code: "PRF531",
    description:
      "A space for proofs, alternate methods, and explaining why answers work, not just what they are.",
    tags: ["Reasoning", "Olympiad", "Derivations"],
    pinnedQuestion: "Can we compare induction and contradiction on the same problem?",
  },
];

export const initialPosts: Post[] = [
  {
    id: 1,
    author: "Aarav Menon",
    role: "Student Mentor",
    type: "Doubt",
    title: "Why does centripetal force not count as a separate force?",
    content:
      "I understand the formula, but I still mix up whether centripetal force is a new force or just the net inward effect. Can someone explain it using a real example?",
    room: "Quantum Circle",
    likes: 18,
    replies: 7,
    tags: ["Physics", "Concept"],
  },
  {
    id: 2,
    author: "Clarixa AI Share",
    role: "Shared with room",
    type: "AI Assist",
    title: "AI summary: Plant tissues through structure and function",
    content:
      "Parenchyma stores and supports, collenchyma bends without breaking, sclerenchyma reinforces. Think of them as soft filler, flexible support, and rigid armor. The room can now debate exceptions and examples.",
    room: "Bio Recall Lab",
    likes: 25,
    replies: 11,
    aiShared: true,
    tags: ["Biology", "AI Shared"],
  },
  {
    id: 3,
    author: "Nithya Rao",
    role: "Top Contributor",
    type: "Solution",
    title: "A faster route to solve this binomial identity",
    content:
      "Instead of expanding everything, compare coefficients and use symmetry. It cuts three lines of work and makes the pattern easier to spot.",
    room: "Proof Forge",
    likes: 33,
    replies: 9,
    tags: ["Math", "Shortcut"],
  },
];

export const initialMessages: Message[] = [
  {
    id: 1,
    from: "Karthik Sai",
    focus: "Math + Olympiad",
    preview: "Want to collaborate on a weekly proof challenge room?",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    from: "Ananya Shah",
    focus: "Chemistry",
    preview: "I liked your explanation style in Quantum Circle.",
    time: "18m ago",
    unread: true,
  },
  {
    id: 3,
    from: "Riya Thomas",
    focus: "Biology + Notes",
    preview: "Can we build a mnemonic thread together for NEET?",
    time: "1h ago",
    unread: false,
  },
];
