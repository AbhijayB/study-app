import { useState } from "react";
import { Link } from "react-router-dom";

export default function Quizzes() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (topic.trim() === "") {
      setError("Please enter a topic first.");
      setQuestions([]);
      return;
    }

    const num = Number(count);
    if (Number.isNaN(num) || num < 1 || num > 15) {
      setError("Enter a number of questions between 1 and 15.");
      setQuestions([]);
      return;
    }

    setError("");


    try {
      const formData = new FormData();
      formData.append("text", topic);
      formData.append("quiz", num);
      const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
      });
      const result = await res.json();
      const realQuestions = [];
      for (let i = 1; i <= num; i++) {
        realQuestions.push({
        id: i,
        text: result.questions[i-1].question_text,
        choices: result.questions[i-1].choices,
        answer: result.questions[i-1].correct_answer,
        });
      }
      setQuestions(realQuestions);

    } catch (err) {
        console.log(err);
        alert("An error occurred during upload. Please try again.");
    } 
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Quizzes</h1>
            <p className="text-sm text-slate-600">
              Generate simple placeholder questions for a topic to practice recall.
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
          <div>
            <label className="block mb-1 text-slate-700">Topic</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: while loops in C++, trig identities, hashing, etc."
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">
              Number of questions (1–15)
            </label>
            <input
              type="number"
              className="w-32 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min={1}
              max={15}
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
            Generate quiz
          </button>
        </form>

        <div className="space-y-3 text-sm">
          {questions.length === 0 ? (
            <p className="text-xs text-slate-500">
              Your quiz will show up here after you click "Generate quiz."
            </p>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <p className="font-semibold mb-2">{q.text}</p>
                <ul className="list-disc list-inside text-slate-700 text-xs space-y-1">
                  {q.choices.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
