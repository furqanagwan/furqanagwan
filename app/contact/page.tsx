"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // Replace with your Formspree endpoint:
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/yourformid";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks for reaching out! I'll get back to you soon.");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setMessage("Sorry, there was a problem. Please try again later.");
      }
    } catch {
      setStatus("error");
      setMessage("Sorry, there was a problem. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full">
        <h1 className="font-extrabold text-[clamp(2rem,12vw,5rem)] leading-none mb-3 text-foreground">
          Contact
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mt-2 mb-6">
          Drop me a message and I’ll get back to you as soon as I can.
        </p>
      </header>

      <section className="max-w-5xl mx-auto w-full px-4 mb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-6 sm:p-10 flex flex-col gap-6 max-w-xl mx-auto border border-neutral-200 dark:border-neutral-800"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold py-2 px-6 rounded transition hover:bg-neutral-800 dark:hover:bg-neutral-200"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {status !== "idle" && (
            <div
              className={`text-sm ${
                status === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
