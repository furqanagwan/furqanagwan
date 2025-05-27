import Link from "next/link";

const links = [
  { title: "email", href: "mailto:hey@.dev" },
  { title: "x.com", href: "https://x.com/furqanagwan" },
  { title: "instagram", href: "https://www.instagram.com/furqanagwan/" },
  { title: "github", href: "https://github.com/furqanagwan" },
  { title: "linkedin", href: "https://www.linkedin.com/in/furqanagwan" },
];

export function LinksSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-black dark:text-white">
        <span className="text-accent mr-2">*</span> links
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-700 dark:text-gray-400 hover:text-accent transition-colors duration-200"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
