import { formatVisibilityTone } from "../utils/roomHelpers";
import type { Room } from "../types";

type RoomsPageProps = {
  rooms: Room[];
};

export function RoomsPage({ rooms }: RoomsPageProps) {
  return (
    <div className="content-stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Study rooms</p>
          <h2>Join with a code, host private discussions, or explore public spaces</h2>
        </div>
      </section>

      <section className="room-grid">
        {rooms.map((room) => (
          <article className="room-card" key={room.id}>
            <div className="room-top">
              <div>
                <h3>{room.name}</h3>
                <p className="muted">{room.subject}</p>
              </div>
              <span className={`pill ${formatVisibilityTone(room.visibility)}`}>{room.visibility}</span>
            </div>
            <p>{room.description}</p>
            <div className="room-meta">
              <span>{room.members} members</span>
              <span>{room.activeNow} active now</span>
              <span>Code: {room.code}</span>
            </div>
            <div className="tag-row">
              {room.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="quote-card">{room.pinnedQuestion}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
