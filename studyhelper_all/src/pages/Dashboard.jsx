import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = {
    name: "Avery Student",
    school: "UTD",
    major: "Computer Science",
  };

  const recentSets = [
    { title: "CS 1436 – Loops Quiz", updated: "Today" },
    { title: "Precal – Trig Identities", updated: "Yesterday" },
    { title: "Cyber – Hashing Notes", updated: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-600">
              Overview of your study activity (fake data for now).
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            ← Back to homepage
          </Link>
        </div>

        <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-slate-500 text-xs">Signed in as</p>
            <p className="font-semibold">{user.name}</p>
            <p className="text-slate-600">
              {user.school} · {user.major}
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-slate-500">Sets created</p>
              <p className="font-semibold">8</p>
            </div>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-slate-500">Quizzes taken</p>
              <p className="font-semibold">14</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Recent sets</h2>
          <div className="grid gap-3 md:grid-cols-3 text-sm">
            {recentSets.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <p className="font-semibold mb-1">{s.title}</p>
                <p className="text-slate-500 text-xs">
                  Last updated: {s.updated}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <Link
            to="/summaries"
            className="bg-white border border-slate-200 rounded-2xl p-4 hover:bg-slate-50"
          >
            <p className="font-semibold mb-1">Summaries</p>
            <p className="text-slate-600 text-xs">
              Paste notes and generate a short summary.
            </p>
          </Link>
          <Link
            to="/notes"
            className="bg-white border border-slate-200 rounded-2xl p-4 hover:bg-slate-50"
          >
            <p className="font-semibold mb-1">Notes</p>
            <p className="text-slate-600 text-xs">
              Keep quick study notes in one place.
            </p>
          </Link>
          <Link
            to="/quizzes"
            className="bg-white border border-slate-200 rounded-2xl p-4 hover:bg-slate-50"
          >
            <p className="font-semibold mb-1">Quizzes</p>
            <p className="text-slate-600 text-xs">
              Generate practice questions for any topic.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
