import type { Student } from "../types";

type ExplorePageProps = {
  students: Student[];
};

export function ExplorePage({ students }: ExplorePageProps) {
  return (
    <div className="content-stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Discover peers</p>
          <h2>Find students who explain well, stay active, and want to collaborate</h2>
        </div>
      </section>

      <div className="leaderboard">
        {students.map((student, index) => (
          <article className="student-card" key={student.id}>
            <div className="student-rank">#{index + 1}</div>
            <div className="student-main">
              <div className="student-head">
                <div className="avatar large">{student.name[0]}</div>
                <div>
                  <h3>{student.name}</h3>
                  <p className="muted">
                    {student.username} | {student.focus}
                  </p>
                </div>
              </div>
              <div className="student-stats">
                <span>{student.streak} day streak</span>
                <span>{student.credits} credits</span>
                <span>{student.posts} posts</span>
                <span>{student.status}</span>
              </div>
            </div>
            <button className="secondary-btn">Message</button>
          </article>
        ))}
      </div>
    </div>
  );
}
