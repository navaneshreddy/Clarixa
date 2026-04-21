import { RoomsPanel } from "../components/RoomsPanel";
import { Topbar } from "../components/Topbar";
import { DashboardPage } from "./DashboardPage";
import { ExplorePage } from "./ExplorePage";
import { MessagesPage } from "./MessagesPage";
import { ProfilePage } from "./ProfilePage";
import { RoomsPage } from "./RoomsPage";
import type {
  DashboardStat,
  JoinRoomForm,
  Message,
  NewPostForm,
  NewRoomForm,
  Post,
  Room,
  Student,
  Tab,
} from "../types";

type WorkspacePageProps = {
  activeTab: Tab;
  joinRoom: JoinRoomForm;
  joinRoomStatus: string;
  me: Student;
  messages: Message[];
  newPost: NewPostForm;
  newRoom: NewRoomForm;
  posts: Post[];
  rooms: Room[];
  stats: DashboardStat[];
  students: Student[];
  setActiveTab: (tab: Tab) => void;
  setJoinRoom: (room: JoinRoomForm) => void;
  setNewPost: (post: NewPostForm) => void;
  setNewRoom: (room: NewRoomForm) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onLogout: () => void;
  onSubmitPost: () => void;
};

export function WorkspacePage(props: WorkspacePageProps) {
  const {
    activeTab,
    joinRoom,
    joinRoomStatus,
    me,
    messages,
    newPost,
    newRoom,
    posts,
    rooms,
    stats,
    students,
    setActiveTab,
    setJoinRoom,
    setNewPost,
    setNewRoom,
    onCreateRoom,
    onJoinRoom,
    onLogout,
    onSubmitPost,
  } = props;

  return (
    <section className="workspace">
      <main className="main-panel">
        <Topbar activeTab={activeTab} me={me} setActiveTab={setActiveTab} />

        {activeTab === "dashboard" ? (
          <DashboardPage
            posts={posts}
            rooms={rooms}
            newPost={newPost}
            stats={stats}
            setNewPost={setNewPost}
            onSubmitPost={onSubmitPost}
          />
        ) : null}

        {activeTab === "rooms" ? <RoomsPage rooms={rooms} /> : null}
        {activeTab === "explore" ? <ExplorePage students={students} /> : null}
        {activeTab === "messages" ? <MessagesPage messages={messages} /> : null}
        {activeTab === "profile" ? <ProfilePage me={me} onLogout={onLogout} /> : null}
      </main>

      {activeTab === "rooms" ? (
        <RoomsPanel
          joinRoom={joinRoom}
          joinRoomStatus={joinRoomStatus}
          newRoom={newRoom}
          setJoinRoom={setJoinRoom}
          setNewRoom={setNewRoom}
          onCreateRoom={onCreateRoom}
          onJoinRoom={onJoinRoom}
        />
      ) : null}
    </section>
  );
}
