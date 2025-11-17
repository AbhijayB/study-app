import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("Avery Student");
  const [school, setSchool] = useState("UTD");
  const [major, setMajor] = useState("Computer Science");
  const [bio, setBio] = useState("First-year CS student who likes tea and loops.");
  const [message, setMessage] = useState("");

  function handleSave(e) {
    e.preventDefault();
    setMessage("Profile saved (locally only, no backend yet).");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-slate-600">
              Example of how a user profile screen could look.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            ← Back to dashboard
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm">
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block mb-1 text-slate-700">Name</label>
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-slate-700">School</label>
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-700">Major / Focus</label>
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-slate-700">Bio</label>
              <textarea
                className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Save profile
            </button>

            {message && (
              <p className="mt-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
