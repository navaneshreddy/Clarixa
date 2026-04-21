import type { NewPostForm, Room } from "../../types";

type DashboardPostFormProps = {
  newPost: NewPostForm;
  rooms: Room[];
  setNewPost: (post: NewPostForm) => void;
  onSubmitPost: () => void;
};

export function DashboardPostForm({
  newPost,
  rooms,
  setNewPost,
  onSubmitPost,
}: DashboardPostFormProps) {
  return (
    <div className="post-form">
      <label>
        Type
        <select
          value={newPost.type}
          onChange={(event) =>
            setNewPost({ ...newPost, type: event.target.value as NewPostForm["type"] })
          }
        >
          <option value="Doubt">Doubt</option>
          <option value="Solution">Solution</option>
          <option value="AI Assist">AI Assist</option>
        </select>
      </label>
      <label>
        Room
        <select
          value={newPost.room}
          onChange={(event) => setNewPost({ ...newPost, room: event.target.value })}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.name}>
              {room.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Title
        <input
          value={newPost.title}
          onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
          placeholder="What are you trying to understand?"
        />
      </label>
      <label>
        Description
        <textarea
          value={newPost.content}
          onChange={(event) => setNewPost({ ...newPost, content: event.target.value })}
          placeholder="Write the doubt, idea, or AI summary you want the room to discuss..."
        />
      </label>
      <button className="primary-btn" onClick={onSubmitPost}>
        Share with room
      </button>
    </div>
  );
}
