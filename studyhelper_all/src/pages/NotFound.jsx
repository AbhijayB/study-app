import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-2">Page not found</h1>
        <p className="text-slate-600 mb-4 text-sm">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:opacity-90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
