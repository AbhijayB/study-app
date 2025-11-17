export default function AdminUsers() {
  const users = [
    { id: 1, name: "Avery Lee", email: "avery@example.com" },
    { id: 2, name: "Sam Rivera", email: "sam@example.com" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <table className="w-full border text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
