import { useState } from "react";
import { Link } from "react-router-dom";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  function handleAdd(e) {
    e.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      setError("Please enter a title and note text.");
      return;
    }

    setError("");
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setBody("");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Notes</h1>
            <p className="text-sm text-slate-600">
              Quick place to jot down class notes or ideas while you study.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            ← Back to dashboard
          </Link>
        </div>

        <form onSubmit={handleAdd} className="space-y-3 text-sm mb-6">
          <div>
            <label className="block mb-1 text-slate-700">Title</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: CS 1436 – While loops"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">Note</label>
            <textarea
              className="w-full h-28 border border-slate-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Example: While loops repeat as long as the condition is true..."
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Save note (local only)
          </button>
        </form>

        <div className="space-y-3 text-sm">
          {notes.length === 0 ? (
            <p className="text-xs text-slate-500">
              You do not have any notes yet. Add one above to see it here.
            </p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <h2 className="font-semibold mb-1">{n.title}</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{n.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
