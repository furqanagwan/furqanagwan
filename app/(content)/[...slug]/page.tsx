import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";

// Helper: Recursively gets all .mdx files for static generation
function getAllMdxFiles(dir: string, prefix = ""): string[] {
  const files: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(prefix, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, relPath));
    } else if (file.endsWith(".mdx")) {
      files.push(relPath.replace(/\.mdx$/, ""));
    }
  }
  return files;
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  return getAllMdxFiles(postsDir).map((slugPath) => ({
    slug: slugPath.split(path.sep),
  }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : String(slug);

  try {
    // Import MDX (local, so you get hot reload + static!)
    const { default: Post, metadata } = await import(`@/posts/${slugPath}.mdx`);

    // Format the date
    const formattedDate = metadata?.date
      ? new Date(metadata.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    // JSON-LD schema (optional, for SEO)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: metadata?.title,
      datePublished: metadata?.date,
      dateModified: metadata?.date,
      description: metadata?.description,
      image: metadata?.image || undefined,
      url: `https://your-site.com/${slugPath}`, // ← Update to your actual URL if you want!
      author: {
        "@type": "Person",
        name: "Furqan Agwan",
      },
    };

    return (
      <section className="animate-fade-in-up">
        {/* SEO Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {/* Title with accent */}
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white flex items-center">
          <span className="text-accent mr-2">*</span>
          {metadata?.title}
        </h1>
        {/* Description */}
        {metadata?.description && (
          <div className="mb-6 text-lg text-gray-800 dark:text-gray-300">
            {metadata.description}
          </div>
        )}
        {/* Date */}
        <div className="mb-8 flex items-center text-sm text-gray-600 dark:text-gray-400">
          {metadata?.date && (
            <time dateTime={metadata.date}>{formattedDate}</time>
          )}
        </div>
        {/* Post Content */}
        <article className="prose max-w-none prose-headings:text-black dark:prose-headings:text-white prose-a:text-accent hover:prose-a:underline dark:prose-invert">
          <Post />
        </article>
      </section>
    );
  } catch (err) {
    notFound();
  }
}
