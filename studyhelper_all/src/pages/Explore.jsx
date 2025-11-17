export default function Explore() {
  const sets = [
    { title: "CS 1436 – Loops & Functions", tags: ["C++", "Basics"] },
    { title: "Precalculus – Trig Identities", tags: ["Trig", "Formulas"] },
    { title: "Cybersecurity – Hashing 101", tags: ["Crypto", "SHA-256"] },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Explore Library</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        {sets.map((s) => (
          <div
            key={s.title}
            className="bg-white border border-slate-200 rounded-2xl p-4"
          >
            <h2 className="font-semibold mb-1">{s.title}</h2>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {s.tags.map((t) => (
                <span key={t} className="px-2 py-1 bg-slate-100 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
