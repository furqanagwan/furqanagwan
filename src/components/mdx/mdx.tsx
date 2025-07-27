"use client";

import { H1, H2, H3, H4 } from "@/components/mdx/elements/heading";

import { MDXAccordion } from "@/components/mdx/elements/accordion";
import {
  Paragraph,
  Blockquote,
  Lead,
  Large,
  Small,
  Muted,
} from "@/components/mdx/elements/text";

import {
  UnorderedList,
  OrderedList,
  ListItem,
} from "@/components/mdx/elements/list";

import { InlineCode, CodeBlock } from "@/components/mdx/elements/code";

import { Table } from "@/components/mdx/elements/table";
import { HorizontalRule, LinkText } from "@/components/mdx/elements/misc";
import { MDXImage } from "@/components/mdx/elements/image";
import { MDXVideo } from "@/components/mdx/elements/video";

import { Separator } from "@/components/mdx/elements/separator";
import { MDXDataTable } from "@/components/mdx/elements/data-table";

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  code: InlineCode,
  pre: CodeBlock,
  table: Table,
  hr: HorizontalRule,
  a: LinkText,
  img: MDXImage,
  video: MDXVideo,
  Accordion: MDXAccordion,
  DataTable: MDXDataTable,
  Separator,
  Lead,
  Large,
  Small,
  Muted,
};
