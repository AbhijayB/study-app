// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Summaries() {
//   const [input, setInput] = useState("");
//   const [error, setError] = useState("");
//   const [summary, setSummary] = useState("");


//   const handleGenerate = async (e) => {
//     e.preventDefault();

//     if (input.trim() === "") {
//       setError("Please paste or type some text first.");
//       setSummary("");
//       return;
//     }
//     try {
//         const formData = new FormData();
//         formData.append("text", input);
//         formData.append("file", null);

//         const res = await fetch("/api/upload", {
//             method: "POST",
//             body: formData
//         });
//         const result = await res.json();
//         setSummary(result.summary);

//     } catch (err) {
//         console.log(err);
//         alert("An error occurred during upload. Please try again.");
//     } 
//     setError("");
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-semibold">Summaries</h1>
//             <p className="text-sm text-slate-600">
//               Paste class notes or a reading, then generate a simple summary.
//             </p>
//           </div>
//           <Link
//             to="/dashboard"
//             className="text-sm text-slate-700 underline hover:text-slate-900"
//           >
//             ← Back to dashboard
//           </Link>
//         </div>

//         <form onSubmit={handleGenerate} className="space-y-3 text-sm mb-6">
//           <label className="block text-slate-700">
//             Paste your notes or reading:
//           </label>
//           <textarea
//             className="w-full h-40 border border-slate-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Example: Today we covered while loops in C++ and how to avoid infinite loops..."
//           />
//           {error && (
//             <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//               {error}
//             </p>
//           )}
//           <button
//             type="submit"
//             className="bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90"
//           >
//             Generate summary
//           </button>
//         </form>

//         <div className="bg-white border border-slate-200 rounded-2xl p-4 text-sm">
//           <h2 className="text-base font-semibold mb-2">Summary preview</h2>
//           {summary ? (
//             <pre className="whitespace-pre-wrap text-slate-700 text-sm">
//               {summary}
//             </pre>
//           ) : (
//             <p className="text-slate-500 text-xs">
//               Your summary will show up here after you click "Generate summary."
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Summaries() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) {
      setFile(null);
      return;
    }

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(selected.type)) {
      setError("Only PDF or DOCX files are allowed.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (input.trim() === "" && !file) {
      setError("Please provide text or upload a PDF/DOCX file.");
      setSummary("");
      return;
    }

    try {
      const formData = new FormData();

      if (input.trim() !== "") {
        formData.append("text", input);
      }

      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setSummary(result.summary);
      setError("");
    } catch (err) {
      console.log(err);
      alert("An error occurred during upload. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Summaries</h1>
            <p className="text-sm text-slate-600">
              Paste class notes or a reading, or upload a PDF/DOCX file.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            ← Back to dashboard
          </Link>
        </div>

        <form onSubmit={handleGenerate} className="space-y-3 text-sm mb-6">
          <label className="block text-slate-700">
            Paste your notes or reading:
          </label>

          <textarea
            className="w-full h-40 border border-slate-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Today we covered while loops in C++ and how to avoid infinite loops..."
          />

          <div>
            <label className="block text-slate-700 mb-1">
              Or upload a PDF/DOCX file:
            </label>

            {/* ⭐ Styled file input */}
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500"
            />

            {file && (
              <p className="text-xs text-slate-600 mt-1">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
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
            Generate summary
          </button>
        </form>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-sm">
          <h2 className="text-base font-semibold mb-2">Summary preview</h2>
          {summary ? (
            <pre className="whitespace-pre-wrap text-slate-700 text-sm">
              {summary}
            </pre>
          ) : (
            <p className="text-slate-500 text-xs">
              Your summary will show up here after you click "Generate summary."
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
