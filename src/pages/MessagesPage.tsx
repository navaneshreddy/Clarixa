import type { Message } from "../types";

type MessagesPageProps = {
  messages: Message[];
};

export function MessagesPage({ messages }: MessagesPageProps) {
  return (
    <div className="content-stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Collaboration inbox</p>
          <h2>Direct messages for partnerships, notes, and doubt-solving teams</h2>
        </div>
      </section>

      <div className="message-list">
        {messages.map((message) => (
          <article className="message-card" key={message.id}>
            <div>
              <div className="message-head">
                <h3>{message.from}</h3>
                <span>{message.time}</span>
              </div>
              <p className="muted">{message.focus}</p>
              <p>{message.preview}</p>
            </div>
            {message.unread ? <span className="pill tone-blue">Unread</span> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
