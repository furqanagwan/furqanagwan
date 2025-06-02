import Link from "next/link";
import InfoSection from "./info-section";

const socials = [
  { name: "X", href: "https://x.com/furqanagwan", color: "#000" },
  { name: "GitHub", href: "https://github.com/furqanagwan", color: "#000" },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/furqanagwan",
    color: "#0077B5",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/furqanagwan/",
    color: "#E4405F",
  },
];

export default function InfoRow() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 mb-12">
      <InfoSection title="Currently working at">
        <a
          href="https://www.baesystems.com/en-uk/uk-businesses/digital-intelligence"
          className="flex items-center gap-2 font-medium text-foreground hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="inline-block w-2 h-2 align-middle bg-[#ED1A3B]" />{" "}
          BAE Systems
        </a>
      </InfoSection>
      <InfoSection title="Previous work">
        <Link
          href="/projects"
          className="font-medium text-foreground hover:underline"
        >
          View portfolio →
        </Link>
      </InfoSection>
      <InfoSection title="Get in touch">
        <a
          href="mailto:furqanagwan@.outlook.com"
          className="font-medium text-foreground hover:underline"
        >
          furqanagwan@.outlook.com
        </a>
      </InfoSection>
      <InfoSection title="Found elsewhere">
        <ul className="flex flex-wrap gap-3 text-sm">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                className="text-foreground hover:underline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="inline-block w-2 h-2 align-middle"
                  style={{ background: social.color }}
                />
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </InfoSection>
    </div>
  );
}
