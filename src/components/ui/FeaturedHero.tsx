import Link from "next/link";
import { Post } from "content-collections";

interface FeaturedHeroProps {
  posts: Post[];
}

const gradients = [
  "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400",
  "bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400",
  "bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400",
  "bg-gradient-to-br from-rose-400 via-fuchsia-400 to-violet-400",
];

export default function FeaturedHero({ posts }: FeaturedHeroProps) {
  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {/* Main featured post */}
      <Link
        href={`/blog/${mainPost.slug}`}
        className="group relative aspect-square md:aspect-auto md:row-span-2 rounded-xl overflow-hidden"
      >
        <div className={`absolute inset-0 ${gradients[0]}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <span className="text-sm font-medium opacity-90 mb-2">
            {mainPost.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight group-hover:opacity-80 transition-opacity">
            {mainPost.title}
          </h2>
        </div>
      </Link>

      {/* Secondary posts */}
      {secondaryPosts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative aspect-video rounded-xl overflow-hidden"
        >
          <div className={`absolute inset-0 ${gradients[index + 1]}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-5 text-white">
            <h3 className="text-lg font-semibold leading-snug group-hover:opacity-80 transition-opacity">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
