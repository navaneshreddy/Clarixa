import type { Room } from "../../types";

type DashboardRoomsListProps = {
  rooms: Room[];
};

export function DashboardRoomsList({ rooms }: DashboardRoomsListProps) {
  return (
    <div className="feature-room-list">
      {rooms.slice(0, 4).map((room) => (
        <article className="feature-room-item" key={room.id}>
          <div className="room-top">
            <div>
              <h3>{room.name}</h3>
              <p className="muted">{room.subject}</p>
            </div>
            <span className="pill">{room.code}</span>
          </div>
          <p className="muted">{room.description}</p>
          <div className="room-meta">
            <span>{room.members} members</span>
            <span>{room.activeNow} active now</span>
            <span>{room.visibility}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
