"use client";

import { useState } from "react";

type Props = {
  text: string;
};

export function ReadAloudButton({ text }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    if (!text) return;

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      className={`px-3 py-1 rounded border bg-gray-100 dark:bg-gray-900 text-black dark:text-white mb-4`}
      onClick={handleClick}
      aria-pressed={speaking}
    >
      {speaking ? "Stop Reading" : "Read Aloud"}
    </button>
  );
}
