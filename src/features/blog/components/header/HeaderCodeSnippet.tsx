"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface HeaderCodeSnippetProps {
  code: string;
}

export function HeaderCodeSnippet({ code }: HeaderCodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 pl-3 pr-2 py-2 rounded-md font-mono text-sm text-black dark:text-white">
      <span>{code}</span>
      <button
        onClick={handleCopy}
        className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
