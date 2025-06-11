"use client";

import Field from "./ui/field";
import Textarea from "./ui/textarea";

export default function ContactForm() {
  return (
    <form
      target="_blank"
      action="https://formsubmit.co/furqanagwan@outlook.com"
      method="POST"
      acceptCharset="UTF-8"
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-6 sm:p-10 flex flex-col gap-6 border border-neutral-200 dark:border-neutral-800 max-w-xl"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="hidden"
        name="_next"
        value="https://furqanagwan.com/thanks"
      />

      <Field label="Name" name="name" type="text" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Textarea label="Message" name="message" rows={5} />

      <button
        type="submit"
        className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold py-2 px-6 rounded transition hover:bg-neutral-800 dark:hover:bg-neutral-200"
      >
        Send message
      </button>
    </form>
  );
}
