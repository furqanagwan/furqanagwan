"use client";

import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/components/mdx/mdx";

export function MdxRenderer({ code }: { code: string }) {
  return <MDXContent components={mdxComponents} code={code} />;
}
