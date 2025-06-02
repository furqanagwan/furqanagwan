<<<<<<< HEAD
import { BlogSection } from "@/components/blog-section";
import { Header } from "@/components/header";
import { LinksSection } from "@/components/links-section";
import { Item, SectionList } from "@/components/section-list";

// All experience arrays are fully typed, ready for future expansion!
const workItems: Item[] = [
  {
    title: "BAE Systems Digital Intelligence",
    role: "Software/DevOps Engineer",
    period: "Aug 2018 – Present",
    description:
      "Worked across multiple client projects, delivering a variety of software solutions using different tech stacks. Adapted quickly to new challenges and project requirements—basically, the Swiss Army knife of the team.",
    href: "https://www.baesystems.com/en-uk/uk-businesses/digital-intelligence",
  },
  {
    title: "Leicester City Football Club",
    role: "Search Steward",
    period: "Aug 2017 – Jun 2018",
    description:
      "Kept match days safe by searching fans, spectators, and media for prohibited items at stadium entry. Manned the away stand to help prevent incidents and made sure both home and away supporters could enjoy the game without chaos.",
    href: "https://www.lcfc.com/pages/en/home",
  },
  {
    title: "Hastings Direct",
    role: "Customer Service Representative (Insurance Broker)",
    period: "Jun 2016 – Feb 2017",
    description:
      "Worked the front lines in a high-paced call centre, helping new customers set up car insurance policies and making sure everyone got the right cover (and maybe a little peace of mind).",
    href: "https://www.hastingsdirect.com/",
  },
  {
    title: "Debenhams",
    role: "Sales Assistant",
    period: "Sep 2014 – Feb 2016",
    description:
      "Kept the sales floor running, helped customers find their fits, and powered through holiday rushes like a retail pro. Learned how to multitask, stay positive, and dodge Black Friday chaos.",
    href: "https://www.debenhams.com/",
  },
] as const;

const projectItems: Item[] = [
  {
    title: "Apprentice Service (GOV.UK)",
    role: "DevOps Engineer",
    description:
      "Currently responsible for maintaining the infrastructure behind the Apprentice Service government website, leveraging Azure Cloud Services to keep things smooth and scalable.",
    href: "https://www.gov.uk/apply-apprenticeship",
  },
  {
    title: "Home Office (GOV.UK)",
    role: "Software Engineer",
    description:
      "Engineered a full-stack internal web system called Cerberus, designed to track consignments and cargo entering the UK. No mythical beasts, just seriously organized logistics.",
    href: "https://www.gov.uk/government/organisations/home-office",
  },
  {
    title: "HM Revenue and Customs (GOV.UK)",
    role: "Data Engineer",
    description:
      "Developed and distributed an internal entity-matching application called EDHMT. Matched entities and organisations to help HMRC combat tax fraud—basically, making sure the bad guys don’t get away.",
    href: "https://www.gov.uk/government/organisations/hm-revenue-customs",
  },
] as const;

const educationItems: Item[] = [
  {
    title: "De Montfort University",
    degree: "BSc Computer Science",
    period: "Sep 2014 – Jul 2018",
    href: "https://www.dmu.ac.uk/",
    description:
      "Graduated with a focus on software engineering, AI, and memes. 🎓",
  },
  {
    title: "Beauchamp College",
    degree: "A-Levels: Economics, IT, Media, Business Studies, General Studies",
    period: "Sep 2010 – Aug 2014",
    href: "https://www.beauchamp.org.uk/",
    description: "Learned maths, physics, and how to survive on coffee.",
  },
] as const;

// Typed for Next.js (optional, but clear)
const HomePage = () => (
  <>
    <Header />
    <SectionList title="work" items={workItems} />
    <SectionList
      title="projects"
      items={projectItems}
      viewAllHref="/projects"
      viewAllText="all projects"
    />
    <SectionList title="education" items={educationItems} />
    <BlogSection />
    <LinksSection />
  </>
);

export default HomePage;
=======
import AboutMe from "@/components/about-me";
import Blog from "@/components/blog-section";
import Footer from "@/components/footer";
import Human from "@/components/human-section";
import InfoRow from "@/components/info-row";
import History from "@/components/history-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full relative">
        <a href="/" className="block">
          <h1 className="font-extrabold text-[clamp(3rem,16vw,7.5rem)] leading-none mb-3 text-foreground">
            Furqan Agwan
          </h1>
        </a>
        <p className="text-2xl text-neutral-600 dark:text-neutral-300 mt-2 mb-6">
          Software engineer & (sorta) devops
        </p>
      </header>
      <InfoRow />
      <Blog />
      <div className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <AboutMe />
        <History />
      </div>
      <Human />
      <Footer />
    </div>
  );
}
>>>>>>> origin/migration
