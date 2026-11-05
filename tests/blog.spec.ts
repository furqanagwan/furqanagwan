import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Furqan Agwan/);
    await expect(
      page.getByRole("heading", { name: "Blog", level: 2 }),
    ).toBeVisible();
  });

  test("displays the All filter", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(
      nav.getByRole("link", { name: "All", exact: true }),
    ).toBeVisible();
  });

  test("navigates to a post", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Blog", level: 2 }),
    ).toBeVisible();
    const articles = page.locator("article");
    test.skip((await articles.count()) === 0, "No blog posts published yet");

    const firstArticle = articles.first();
    const title = await firstArticle.getByRole("heading").textContent();

    expect(title).toBeTruthy();

    await firstArticle.getByRole("link").click();

    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
