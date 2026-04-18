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
    <p className="text-[20px] md:text-[22px] leading-[1.5] text-foreground">
      {children}
    </p>
  );
}

function MDXImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src) return null;
  return (
    <span className="block relative w-full h-auto my-10 rounded-xl overflow-hidden bg-muted">
      <Image
        src={props.src as string}
        alt={props.alt || "Blog post image"}
        width={1200}
        height={675}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        quality={85}
      />
    </span>
  );
}

function MDXParagraph({ children }: { children?: React.ReactNode }) {
  const kids = React.Children.toArray(children);
  if (kids.length === 1) {
    const child = kids[0];
    if (
      React.isValidElement(child) &&
      (child.type === MDXImage ||
        (typeof child.type === "function" && child.type.name === "MDXImage"))
    ) {
      return <>{children}</>;
    }
  }
  return <p>{children}</p>;
}

export function PostBody({ code }: PostBodyProps) {
  return (
    <div className="max-w-[1440px] w-full mx-auto px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="article-prose">
          <MDXContent
            code={code}
            components={{
              Lead,
              Separator,
              Accordion,
              AccordionItem,
              AccordionTrigger,
              AccordionContent,
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
                  className="inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
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
