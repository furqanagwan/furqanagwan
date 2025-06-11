import ContactForm from "@/components/form";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="max-w-5xl mx-auto w-full px-4 pt-20 mb-12">
        <h1 className="font-extrabold text-[clamp(2rem,12vw,5rem)] leading-none mb-3 text-foreground">
          Contact
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mt-2 mb-6">
          Drop me a message and I’ll get back to you as soon as I can.
        </p>
        {/* Wider form, custom width */}
        <div className="w-full max-w-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
