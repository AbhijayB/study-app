import { Link } from "react-router-dom";

export default function Community() {
  const posts = [
    {
      id: 1,
      title: "CS 1436 – Loops quiz set shared",
      author: "Avery L.",
      course: "CS 1436",
      type: "Quiz",
    },
    {
      id: 2,
      title: "Precal trig identities flashcards",
      author: "Jordan M.",
      course: "Precalculus",
      type: "Flashcards",
    },
    {
      id: 3,
      title: "Cybersecurity hashing notes",
      author: "Sam R.",
      course: "Intro to Cybersecurity",
      type: "Notes",
    },
  ];

  const groups = [
    {
      id: 1,
      name: "CS 1436 – Exam 2 Study Group",
      members: 8,
      schedule: "Sundays · 3–5 PM",
    },
    {
      id: 2,
      name: "Precal – Trig Help",
      members: 5,
      schedule: "Tuesdays · 7–8 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Community</h1>
            <p className="text-sm text-slate-600">
              Example space where students could share sets and study together.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            ← Back to homepage
          </Link>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Shared sets</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {posts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-sm"
              >
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-slate-600 mb-1">{p.course}</p>
                <p className="text-slate-500">
                  {p.type} · shared by{" "}
                  <span className="font-medium">{p.author}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Study groups</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {groups.map((g) => (
              <div
                key={g.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-sm"
              >
                <h3 className="font-semibold mb-1">{g.name}</h3>
                <p className="text-slate-600 mb-1">
                  {g.members} members · {g.schedule}
                </p>
                <button className="mt-1 inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white hover:opacity-90">
                  Request to join
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-dashed border-slate-300 rounded-2xl p-4 text-xs text-slate-500">
          <p className="mb-1 font-semibold">Future ideas</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Filter by course (CS, math, cybersecurity, etc.).</li>
            <li>Real-time chat for each study group.</li>
            <li>Upvotes or favorites for helpful sets.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
