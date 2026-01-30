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

  test("displays filter buttons", async ({ page }) => {
    // Scope to the navigation bar to avoid footer links
    const nav = page.getByRole("navigation");
    await expect(
      nav.getByRole("link", { name: "All", exact: true }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Career", exact: true }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Travel", exact: true }),
    ).toBeVisible();
  });

  test("navigates to a post", async ({ page }) => {
    // Click the first article card
    const firstArticle = page.locator("article").first();
    const title = await firstArticle.getByRole("heading").textContent();

    // Ensure we have a title to check against
    expect(title).toBeTruthy();

    await firstArticle.getByRole("link").click();

    // Expect url to be a blog post
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
