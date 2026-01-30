import Image from "next/image";
import React from "react";
import { MDXContent } from "@content-collections/mdx/react";
import { Separator } from "@/components/ui/Separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { VideoPlayer } from "../media/VideoPlayer";
import { ImageSwitcher } from "../media/ImageSwitcher";
import { ImageGrid } from "../media/ImageGrid";
import { Caption } from "../content/Caption";
import { PromptBox } from "../content/PromptBox";

interface PostBodyProps {
  code: string;
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xl text-muted-foreground mb-8 leading-relaxed">
      {children}
    </div>
  );
}

// Custom Image component for MDX to optimize <img> tags
function MDXImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // If no src, return null (shouldn't happen for valid markdown images)
  if (!props.src) return null;

  return (
    <span className="block relative w-full h-auto my-8 rounded-lg overflow-hidden bg-muted">
      <Image
        src={props.src as string}
        alt={props.alt || "Blog post image"}
        width={800}
        height={450}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        quality={85}
      />
    </span>
  );
}

// Custom paragraph component that unwraps paragraphs containing only images
// This prevents invalid HTML nesting (p > div) when MDX wraps images in <p> tags
function MDXParagraph({ children }: { children?: React.ReactNode }) {
  // Check if the only child is an image (MDXImage renders a span)
  const childArray = React.Children.toArray(children);

  // If there's only one child and it's a React element with type that indicates an image
  if (childArray.length === 1) {
    const child = childArray[0];
    if (React.isValidElement(child)) {
      // Check if it's our MDXImage component (renders as span with block class)
      // or if the child has props indicating it's an image
      const childType = child.type;
      if (
        childType === MDXImage ||
        (typeof childType === "function" && childType.name === "MDXImage")
      ) {
        // Return without wrapping in <p>
        return <>{children}</>;
      }
    }
  }

  return <p>{children}</p>;
}

export function PostBody({ code }: PostBodyProps) {
  return (
    <div className="grid grid-cols-12 max-w-[1440px] w-full mx-auto px-6 md:px-8">
      {/* Content Column: Narrower than header (6 cols on large, like OpenAI's body text) */}
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
        {/* MDX Content with OpenAI prose styling */}
        <div
          className="
          text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] text-black dark:text-white font-normal
          [&>p]:mb-6 [&>p]:tracking-[-0.1px]
          [&>p:first-of-type]:md:text-[20px] [&>p:first-of-type]:md:leading-[32px] [&>p:first-of-type]:tracking-[-0.2px]
          
          [&>h2]:text-[24px] [&>h2]:leading-[30px] md:[&>h2]:text-[28px] md:[&>h2]:leading-[34px]
          [&>h2]:tracking-[-0.8px] [&>h2]:font-medium [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:scroll-mt-[calc(var(--header-h)+var(--toc-button-h))]
          
          [&>h3]:text-[20px] [&>h3]:leading-[26px]
          [&>h3]:font-medium [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:scroll-mt-[calc(var(--header-h)+var(--toc-button-h))]
          
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6
          [&>ul>li]:pl-1 [&>ul>li]:mb-2
          
          [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6
          [&>ol>li]:pl-1 [&>ol>li]:mb-2
          
          [&>a]:underline [&>a]:underline-offset-[0.25rem] [&>a]:decoration-1 [&>a]:decoration-black/40 dark:[&>a]:decoration-white/40 hover:[&>a]:decoration-black dark:hover:[&>a]:decoration-white [&>a]:transition-colors
          [&_a]:underline [&_a]:underline-offset-[0.25rem] [&_a]:decoration-1 [&_a]:decoration-black/40 dark:[&_a]:decoration-white/40 hover:[&_a]:decoration-black dark:hover:[&_a]:decoration-white [&_a]:transition-colors
          
          [&>blockquote]:border-l-2 [&>blockquote]:border-black dark:[&>blockquote]:border-white [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-[22px] [&>blockquote]:leading-[32px]
          
          [&>pre]:bg-gray-50 [&>pre]:dark:bg-white/5 [&>pre]:p-5 [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:text-sm
          
          [&>figure]:my-10 [&>figure]:w-full
          "
        >
          <MDXContent
            code={code}
            components={{
              Lead,
              Separator,
              Accordion,
              AccordionItem,
              AccordionTrigger,
              AccordionContent,
              ProductCard: () => (
                <div className="border p-4 rounded bg-muted text-center my-4 font-mono text-sm">
                  Example Product Card Component
                </div>
              ),
              ExpensiveComponent: () => (
                <div className="border p-4 rounded bg-muted text-center my-4 font-mono text-sm">
                  Expensive Component Visualization
                </div>
              ),
              Child: () => (
                <div className="border p-4 rounded bg-muted text-center my-4 font-mono text-sm">
                  Child Component
                </div>
              ),
              img: MDXImage,
              p: MDXParagraph,
              VideoPlayer,
              ImageSwitcher,
              ImageGrid,
              Caption,
              PromptBox,
              Button: (
                props: React.ButtonHTMLAttributes<HTMLButtonElement>,
              ) => (
                <button
                  className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                  {...props}
                />
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
