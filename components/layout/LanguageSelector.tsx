"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Globe, X, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "zh-HK", native: "中文", english: "Chinese", region: "Hong Kong" },
  { code: "hr", native: "Hrvatski", english: "Croatian", region: "" },
  { code: "cs", native: "Čeština", english: "Czech", region: "" },
  { code: "da", native: "Dansk", english: "Danish", region: "" },
  { code: "nl", native: "Nederlands", english: "Dutch", region: "" },
  {
    code: "en-US",
    native: "English",
    english: "English",
    region: "United States",
  },
  { code: "et", native: "Eesti", english: "Estonian", region: "" },
  { code: "fil", native: "Filipino", english: "Filipino", region: "" },
  { code: "fi", native: "Suomi", english: "Finnish", region: "" },
  { code: "fr-CA", native: "Français", english: "French", region: "Canada" },
  { code: "fr-FR", native: "Français", english: "French", region: "France" },
  { code: "de", native: "Deutsch", english: "German", region: "" },
  { code: "el", native: "Ελληνικά", english: "Greek", region: "" },
  { code: "hi", native: "हिन्दी", english: "Hindi", region: "" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian", region: "" },
  { code: "it", native: "Italiano", english: "Italian", region: "" },
  { code: "ja", native: "日本語", english: "Japanese", region: "" },
  { code: "ko", native: "한국어", english: "Korean", region: "" },
  { code: "ms", native: "Bahasa Melayu", english: "Malay", region: "" },
  { code: "no", native: "Norsk", english: "Norwegian", region: "" },
  { code: "pl", native: "Polski", english: "Polish", region: "" },
  {
    code: "pt-BR",
    native: "Português",
    english: "Portuguese",
    region: "Brazil",
  },
  {
    code: "pt-PT",
    native: "Português",
    english: "Portuguese",
    region: "Portugal",
  },
  { code: "ro", native: "Română", english: "Romanian", region: "" },
  { code: "ru", native: "Русский", english: "Russian", region: "" },
  { code: "es-ES", native: "Español", english: "Spanish", region: "Spain" },
  { code: "es-MX", native: "Español", english: "Spanish", region: "Mexico" },
  { code: "sv", native: "Svenska", english: "Swedish", region: "" },
  { code: "th", native: "ไทย", english: "Thai", region: "" },
  { code: "tr", native: "Türkçe", english: "Turkish", region: "" },
  { code: "uk", native: "Українська", english: "Ukrainian", region: "" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese", region: "" },
];

export default function LanguageSelector() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("en-US");

  const selectedLang = languages.find((l) => l.code === selectedLanguage);

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.native.toLowerCase().includes(search.toLowerCase()) ||
      lang.english.toLowerCase().includes(search.toLowerCase()) ||
      lang.region.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (code: string) => {
    setSelectedLanguage(code);
    setOpen(false);
    // In a real app, you would handle language change here
    // e.g., router.push with locale, or update i18n context
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4" />
          <span>
            {selectedLang?.english}
            {selectedLang?.region && ` · ${selectedLang.region}`}
          </span>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 bg-background shadow-xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            // Desktop: positioned bottom-right corner
            "bottom-4 right-4 w-[320px] max-h-[480px] rounded-xl border",
            // Mobile: full width sheet from bottom
            "max-sm:inset-x-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:max-h-[70vh] max-sm:rounded-t-xl max-sm:rounded-b-none",
            "data-[state=closed]:max-sm:slide-out-to-bottom data-[state=open]:max-sm:slide-in-from-bottom",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <DialogPrimitive.Title className="text-base font-medium">
              Select language
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Language List */}
          <div className="overflow-y-auto flex-1 max-h-[320px] max-sm:max-h-[calc(70vh-120px)]">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between",
                  selectedLanguage === lang.code && "bg-muted/30",
                )}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {lang.native}
                    {lang.region && ` ${lang.region}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {lang.english}
                    {lang.region && ` ${lang.region}`}
                  </span>
                </div>
                {selectedLanguage === lang.code && (
                  <Check className="h-4 w-4 text-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="p-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
