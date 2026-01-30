import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/);
    await expect(
      page.getByRole("heading", { name: "Get in Touch" }),
    ).toBeVisible();
  });

  test("displays contact links", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /hello@furqanagwan.com/ }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /LinkedIn/ }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /GitHub/ }).first(),
    ).toBeVisible();
  });

  test("displays location", async ({ page }) => {
    await expect(page.getByText("Location")).toBeVisible();
    await expect(page.getByText("London, UK")).toBeVisible();
  });
});
