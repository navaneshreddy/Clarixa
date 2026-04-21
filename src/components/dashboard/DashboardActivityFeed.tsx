import type { Post } from "../../types";

type DashboardActivityFeedProps = {
  posts: Post[];
};

export function DashboardActivityFeed({ posts }: DashboardActivityFeedProps) {
  return (
    <section className="feed-list">
      {posts.slice(0, 4).map((post) => (
        <article className="feed-card" key={post.id}>
          <div className="feed-header">
            <div>
              <span className="pill">{post.type}</span>
              <h3>{post.title}</h3>
              <p className="muted">
                {post.author} | {post.role} | {post.room}
              </p>
            </div>
            {post.aiShared ? <span className="pill tone-blue">Shared with everyone</span> : null}
          </div>
          <p>{post.content}</p>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="engagement-row">
            <span>{post.likes} appreciates</span>
            <span>{post.replies} replies</span>
          </div>
        </article>
      ))}
    </section>
  );
}
