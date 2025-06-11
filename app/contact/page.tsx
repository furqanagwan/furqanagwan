import ContactForm from "@/components/form";

export default function ContactPage() {
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
      <section className="max-w-5xl w-full px-4 mb-12">
        <ContactForm />
      </section>
    </main>
  );
}
