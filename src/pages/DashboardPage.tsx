import { useState } from "react";
import { DashboardActivityFeed } from "../components/dashboard/DashboardActivityFeed";
import { DashboardFeatureHeader } from "../components/dashboard/DashboardFeatureHeader";
import { DashboardFeatureMenu } from "../components/dashboard/DashboardFeatureMenu";
import { DashboardPostForm } from "../components/dashboard/DashboardPostForm";
import { DashboardProgressGrid } from "../components/dashboard/DashboardProgressGrid";
import { DashboardRoomsList } from "../components/dashboard/DashboardRoomsList";
import type { DashboardStat, NewPostForm, Post, Room } from "../types";

type DashboardFeature = "menu" | "progress" | "post" | "rooms" | "activity";

type DashboardPageProps = {
  posts: Post[];
  rooms: Room[];
  newPost: NewPostForm;
  stats: DashboardStat[];
  setNewPost: (post: NewPostForm) => void;
  onSubmitPost: () => void;
};

const dashboardTitles: Record<Exclude<DashboardFeature, "menu">, string> = {
  progress: "Progress snapshot",
  post: "Post to your room",
  rooms: "Important rooms",
  activity: "Recent discussions",
};

export function DashboardPage({
  posts,
  rooms,
  newPost,
  stats,
  setNewPost,
  onSubmitPost,
}: DashboardPageProps) {
  const [activeFeature, setActiveFeature] = useState<DashboardFeature>("menu");

  const featureCards = [
    {
      key: "progress",
      eyebrow: "Overview",
      title: "Progress snapshot",
      description: "See your streak, credits, shared answers, and live room activity quickly.",
      meta: `${stats[0]?.value ?? ""} streak`,
    },
    {
      key: "post",
      eyebrow: "Share",
      title: "Post to your room",
      description: "Create one doubt, solution, or AI-assisted explanation without extra clutter.",
      meta: `${rooms.length} rooms ready`,
    },
    {
      key: "rooms",
      eyebrow: "Rooms",
      title: "Important rooms",
      description: "Focus on the rooms that are active now and easy to join or revisit.",
      meta: `${rooms.length} total rooms`,
    },
    {
      key: "activity",
      eyebrow: "Feed",
      title: "Recent discussions",
      description: "Open the latest useful student posts and AI shares in one dedicated screen.",
      meta: `${posts.length} recent posts`,
    },
  ];

  if (activeFeature === "menu") {
    return (
      <DashboardFeatureMenu
        features={featureCards}
        onOpenFeature={(feature) => setActiveFeature(feature as DashboardFeature)}
      />
    );
  }

  return (
    <div className="content-stack">
      <section className="feature-screen-card">
        <DashboardFeatureHeader
          title={dashboardTitles[activeFeature]}
          onBack={() => setActiveFeature("menu")}
        />

        {activeFeature === "progress" ? <DashboardProgressGrid stats={stats} /> : null}
        {activeFeature === "post" ? (
          <DashboardPostForm
            newPost={newPost}
            rooms={rooms}
            setNewPost={setNewPost}
            onSubmitPost={onSubmitPost}
          />
        ) : null}
        {activeFeature === "rooms" ? <DashboardRoomsList rooms={rooms} /> : null}
        {activeFeature === "activity" ? <DashboardActivityFeed posts={posts} /> : null}
      </section>
    </div>
  );
}
