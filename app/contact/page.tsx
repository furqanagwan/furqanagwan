import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Furqan Agwan",
};

export default function ContactPage() {
  return (
    <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight heading-display mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Have a question, project idea, or just want to say hello? I&apos;d
          love to hear from you.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Email */}
        <a
          href="mailto:hello@furqanagwan.com"
          className="group p-8 border border-border rounded-xl hover:border-foreground/20 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-secondary">
              <Mail size={24} />
            </div>
            <h2 className="text-xl font-semibold">Email</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            The best way to reach me for professional inquiries.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
            hello@furqanagwan.com
            <ArrowRight size={16} />
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/furqanagwan"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-8 border border-border rounded-xl hover:border-foreground/20 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-secondary">
              <Linkedin size={24} />
            </div>
            <h2 className="text-xl font-semibold">LinkedIn</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Connect with me professionally and see my career updates.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
            View Profile
            <ArrowRight size={16} />
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/furqanagwan"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-8 border border-border rounded-xl hover:border-foreground/20 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-secondary">
              <Github size={24} />
            </div>
            <h2 className="text-xl font-semibold">GitHub</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Check out my open source projects and contributions.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
            View Repositories
            <ArrowRight size={16} />
          </span>
        </a>

        {/* Location */}
        <div className="p-8 border border-border rounded-xl bg-secondary/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-secondary">
              <span className="text-2xl">📍</span>
            </div>
            <h2 className="text-xl font-semibold">Location</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Based in the United Kingdom, available for remote work worldwide.
          </p>
          <span className="text-sm font-medium text-foreground">
            London, UK
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center border-t border-border pt-16">
        <p className="text-muted-foreground mb-6">
          Prefer to explore my work first?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/projects">
              View Projects <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/experiences">
              See Experience <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
