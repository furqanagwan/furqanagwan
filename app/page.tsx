import AboutMe from "@/components/about-me";
import Blog from "@/components/blog-section";
import Footer from "@/components/footer";
import InfoRow from "@/components/info-row";
import History from "@/components/history-section";
import Human from "@/components/human-section";
import AthleticStatsSection from "@/components/athletic-stats-section";

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
      {/* <Human />
      <AthleticStatsSection /> */}
      <Footer />
    </div>
  );
}
