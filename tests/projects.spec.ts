import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Furqan Agwan/);
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  });

  test("displays project items", async ({ page }) => {
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("projects have links", async ({ page }) => {
    const firstProject = page.locator("article").first();
    await expect(firstProject.getByRole("link").first()).toBeVisible();
  });
});
