import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Furqan Agwan/);
});

test("hero section is visible", async ({ page }) => {
  await page.goto("/");

  // Check for the main heading
  await expect(
    page.getByRole("heading", { name: "Documenting my journey" }),
  ).toBeVisible();

  // Check for the CTA button
  await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
});

test("navigation works", async ({ page }) => {
  await page.goto("/");

  // Click the blog link
  await page.getByRole("link", { name: "Read the blog" }).click();

  // Expect URL to contain 'blog'
  await expect(page).toHaveURL(/.*blog/);
});
