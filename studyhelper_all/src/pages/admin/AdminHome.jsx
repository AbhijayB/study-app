import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Admin Panel</h1>
      <p className="text-sm text-slate-600 mb-4">
        Simple placeholder admin area.
      </p>
      <ul className="list-disc ml-6 space-y-2 text-sm">
        <li>
          <Link className="text-blue-600 underline" to="/admin/users">
            View users
          </Link>
        </li>
      </ul>
    </div>
  );
}
