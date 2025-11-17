import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }

    setError("");

    console.log("Signed in as:", email);

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-slate-600 mb-4">
          Enter your email and password to continue.
        </p>

        {error !== "" && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block mb-1 text-slate-700">Email</label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">Password</label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-600 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-slate-900 font-medium underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
