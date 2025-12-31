import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  href: string;
  image?: string;
  category?: string;
  date?: string;
  featured?: boolean;
  gradient?: number;
  className?: string;
}

const gradients = [
  "gradient-1",
  "gradient-2",
  "gradient-3",
  "gradient-4",
  "gradient-5",
  "gradient-6",
];

export default function PostCard({
  title,
  href,
  image,
  category,
  date,
  featured = false,
  gradient,
  className,
}: PostCardProps) {
  const gradientClass =
    gradient !== undefined
      ? gradients[gradient % gradients.length]
      : gradients[0];

  return (
    <Link href={href} className={cn("group block outline-none", className)}>
      <Card className="border-0 shadow-none bg-transparent rounded-none p-0 overflow-visible">
        {/* Image container */}
        <div
          className={cn(
            "relative overflow-hidden mb-3 transition-all duration-500 ease-out",
            featured ? "aspect-[16/9]" : "aspect-[4/3]", // OpenAI uses various aspects
            // OpenAI distinct hover: precise scale
            "group-hover:opacity-90",
          )}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full ${gradientClass}`} />
          )}
        </div>

        {/* Content */}
        <CardContent className="p-0 pt-2 space-y-1">
          {/* Title - Title is below image, minimal */}
          <h3 className="text-[17px] font-semibold tracking-tight leading-snug group-hover:underline decoration-1 underline-offset-4">
            {title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 mt-1">
            {date && (
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                {date}
              </span>
            )}
            {category && (
              <>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {category}
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
