import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Furqan Agwan/);
    // Be specific about the heading level (h2 is used for page title in BlogPage)
    await expect(
      page.getByRole("heading", { name: "Blog", level: 2 }),
    ).toBeVisible();
  });

  test("displays the All filter", async ({ page }) => {
    // Category filters are generated from the posts that exist, so only
    // "All" is guaranteed. Scope to navigation to avoid footer links.
    const nav = page.getByRole("navigation");
    await expect(
      nav.getByRole("link", { name: "All", exact: true }),
    ).toBeVisible();
  });

  test("navigates to a post", async ({ page }) => {
    // Wait for the page to render before counting posts.
    await expect(
      page.getByRole("heading", { name: "Blog", level: 2 }),
    ).toBeVisible();
    const articles = page.locator("article");
    test.skip((await articles.count()) === 0, "No blog posts published yet");

    // Click the first article card
    const firstArticle = articles.first();
    const title = await firstArticle.getByRole("heading").textContent();

    // Ensure we have a title to check against
    expect(title).toBeTruthy();

    await firstArticle.getByRole("link").click();

    // Expect url to be a blog post
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
