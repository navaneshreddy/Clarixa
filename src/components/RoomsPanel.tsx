import type { JoinRoomForm, NewRoomForm } from "../types";

type RoomsPanelProps = {
  joinRoom: JoinRoomForm;
  joinRoomStatus: string;
  newRoom: NewRoomForm;
  setJoinRoom: (room: JoinRoomForm) => void;
  setNewRoom: (room: NewRoomForm) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
};

export function RoomsPanel({
  joinRoom,
  joinRoomStatus,
  newRoom,
  setJoinRoom,
  setNewRoom,
  onCreateRoom,
  onJoinRoom,
}: RoomsPanelProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <p className="eyebrow">Create room</p>
        <label>
          Room name
          <input
            value={newRoom.name}
            onChange={(event) => setNewRoom({ ...newRoom, name: event.target.value })}
            placeholder="Eg. Organic Chemistry Sprint"
          />
        </label>
        <label>
          Subject
          <input
            value={newRoom.subject}
            onChange={(event) => setNewRoom({ ...newRoom, subject: event.target.value })}
            placeholder="Chemistry"
          />
        </label>
        <label>
          Visibility
          <select
            value={newRoom.visibility}
            onChange={(event) =>
              setNewRoom({ ...newRoom, visibility: event.target.value as NewRoomForm["visibility"] })
            }
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>
        <button className="secondary-btn" onClick={onCreateRoom} type="button">
          Start room
        </button>
      </div>

      <div className="sidebar-card">
        <p className="eyebrow">Join room</p>
        <label>
          Room code
          <input
            value={joinRoom.code}
            onChange={(event) => setJoinRoom({ code: event.target.value.toUpperCase() })}
            placeholder="Enter code like QTM247"
          />
        </label>
        <button className="secondary-btn" onClick={onJoinRoom} type="button">
          Join room
        </button>
        {joinRoomStatus ? <p className="status-copy">{joinRoomStatus}</p> : null}
      </div>
    </aside>
  );
}
