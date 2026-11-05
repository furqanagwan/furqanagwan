import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/features/blog/queries";
import { SITE_NAME } from "@/lib/site";

export const alt = `Blog post by ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogPostSocialPreviewImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? SITE_NAME;
  const category = post?.category ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)" }}>{category}</div>
        <div style={{ fontSize: 72, fontWeight: 500, letterSpacing: -2, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>furqanagwan</div>
      </div>
    ),
    size,
  );
}
