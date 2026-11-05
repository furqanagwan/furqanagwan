import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Furqan Agwan/);
});

test("hero section is visible", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Documenting my journey" }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
});

test("navigation works", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Read the blog" }).click();

  await expect(page).toHaveURL(/.*blog/);
});
