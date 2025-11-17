import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function Homepage() {
  const [open, setOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinkBase =
    "text-sm text-slate-700 hover:text-slate-900 px-2 py-1 rounded-md";
  const navLinkActive = "font-semibold underline";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 bg-white/90 backdrop-blur border-b p-4 flex justify-between items-center z-20">
        <Link to="/" className="font-bold text-xl">
          StudyHelper
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              navLinkBase + (isActive ? " " + navLinkActive : "")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/summaries"
            className={({ isActive }) =>
              navLinkBase + (isActive ? " " + navLinkActive : "")
            }
          >
            Summaries
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              navLinkBase + (isActive ? " " + navLinkActive : "")
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              navLinkBase + (isActive ? " " + navLinkActive : "")
            }
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              navLinkBase + (isActive ? " " + navLinkActive : "")
            }
          >
            Community
          </NavLink>
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex gap-3 items-center">
          <NavLink to="/signin" className="px-4 py-2 border rounded-xl text-sm">
            Sign in
          </NavLink>

          <Button asChild className="text-sm px-4 py-2 rounded-xl">
            <NavLink to="/signup">Create account</NavLink>
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ≡
        </button>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 md:hidden space-y-3 border-b bg-white z-10"
        >
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/summaries"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Summaries
          </NavLink>
          <NavLink
            to="/notes"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Notes
          </NavLink>
          <NavLink
            to="/quizzes"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/community"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Community
          </NavLink>
          <NavLink
            to="/signin"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setOpen(false)}
            className="block text-sm text-slate-800"
          >
            Create account
          </NavLink>
        </motion.div>
      )}

      {/* HERO */}
      <section className="p-10 text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          All-in-one study toolkit
        </motion.h1>

        <motion.p
          className="text-slate-600 mb-6 max-w-xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Summaries, notes, quizzes, and more — all in one place, built for real
          students balancing real life.
        </motion.p>

        <motion.div
          className="flex justify-center gap-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild className="rounded-xl px-6 py-3">
            <NavLink to="/signup">Create account</NavLink>
          </Button>
          <NavLink
            to="/signin"
            className="px-6 py-3 border rounded-xl text-sm flex items-center justify-center"
          >
            Sign in
          </NavLink>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="p-10 max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl font-semibold mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          What you can do
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            {
              title: "Summaries",
              text: "Paste long notes and turn them into short bullet points.",
            },
            {
              title: "Notes",
              text: "Keep quick study notes in one place while you work.",
            },
            {
              title: "Quizzes",
              text: "Generate simple practice questions for any topic.",
            },
            {
              title: "Community",
              text: "Browse shared sets and study groups.",
            },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>{item.text}</CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LIBRARY / EXAMPLES */}
      <section className="p-10 max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl font-semibold mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Example sets
        </motion.h2>

        <motion.p
          className="text-sm text-slate-600 mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Want to see what other students are sharing?{" "}
          <NavLink
            to="/community"
            className="text-slate-900 underline font-medium"
          >
            Visit the community page
          </NavLink>
          .
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            {
              title: "CS 1436 – Loops",
              text: "C++ basics for beginners.",
            },
            {
              title: "Trig Identities",
              text: "Important identities for precalculus.",
            },
            {
              title: "Cybersecurity",
              text: "Hashing fundamentals.",
            },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>{item.text}</CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="p-6 text-center border-t text-sm text-slate-500">
        © {new Date().getFullYear()} StudyHelper
      </footer>
    </div>
  );
}
