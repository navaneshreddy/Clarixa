import { AuthPage } from "./pages/AuthPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { useClarixaApp } from "./hooks/useClarixaApp";
import { isFirebaseConfigured } from "./services/firebase";

function App() {
  const appState = useClarixaApp();

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      {appState.isLoggedIn ? (
        <WorkspacePage
          activeTab={appState.activeTab}
          joinRoom={appState.joinRoom}
          joinRoomStatus={appState.joinRoomStatus}
          me={appState.me}
          messages={appState.messages}
          newPost={appState.newPost}
          newRoom={appState.newRoom}
          posts={appState.posts}
          rooms={appState.rooms}
          stats={appState.stats}
          students={appState.students}
          setActiveTab={appState.setActiveTab}
          setJoinRoom={appState.setJoinRoom}
          setNewPost={appState.setNewPost}
          setNewRoom={appState.setNewRoom}
          onCreateRoom={appState.onCreateRoom}
          onJoinRoom={appState.onJoinRoom}
          onLogout={appState.onLogout}
          onSubmitPost={appState.onSubmitPost}
        />
      ) : (
        <AuthPage
          firebaseReady={isFirebaseConfigured}
          authMessage={appState.authMessage}
          onSignIn={appState.onSignIn}
          onSignUp={appState.onSignUp}
        />
      )}
    </div>
  );
}

export default App;
