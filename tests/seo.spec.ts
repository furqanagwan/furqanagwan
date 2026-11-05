import { test, expect } from "@playwright/test";

const PAGES_WITH_CANONICAL = [
  { path: "/", canonical: "https://furqanagwan.com" },
  { path: "/projects", canonical: "https://furqanagwan.com/projects" },
  { path: "/contact", canonical: "https://furqanagwan.com/contact" },
  { path: "/blog", canonical: "https://furqanagwan.com/blog" },
  { path: "/experiences", canonical: "https://furqanagwan.com/experiences" },
  { path: "/qualifications", canonical: "https://furqanagwan.com/qualifications" },
];

for (const { path, canonical } of PAGES_WITH_CANONICAL) {
  test(`${path} declares its canonical URL and a social preview image`, async ({ page }) => {
    await page.goto(path);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
  });
}

test("page titles don't repeat the site name", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveTitle("Projects | Furqan Agwan");
});

test("the site social preview image renders as a 1200x630 PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
});

test("pages keep the RSS feed link and their own Open Graph URL", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveAttribute(
    "href",
    "https://furqanagwan.com/feed.xml",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://furqanagwan.com/projects",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Projects");
});

test("X cards don't reuse the home page title on other pages", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.locator('meta[name="twitter:title"][content="Furqan Agwan"]')).toHaveCount(0);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});
