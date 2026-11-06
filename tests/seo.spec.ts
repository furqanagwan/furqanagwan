import { test, expect } from "@playwright/test";
import { SITE_URL } from "../src/lib/site";

const PAGES_WITH_CANONICAL = [
  { path: "/", canonical: SITE_URL },
  { path: "/projects", canonical: `${SITE_URL}/projects` },
  { path: "/contact", canonical: `${SITE_URL}/contact` },
  { path: "/blog", canonical: `${SITE_URL}/blog` },
  { path: "/experiences", canonical: `${SITE_URL}/experiences` },
  { path: "/qualifications", canonical: `${SITE_URL}/qualifications` },
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
    `${SITE_URL}/feed.xml`,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    `${SITE_URL}/projects`,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Projects");
});

test("X cards don't reuse the home page title on other pages", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.locator('meta[name="twitter:title"][content="Furqan Agwan"]')).toHaveCount(0);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});
