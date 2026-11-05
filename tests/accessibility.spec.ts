import { test, expect } from "@playwright/test";

test.describe("Keyboard access", () => {
  test("the first Tab focuses a skip link that moves focus to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  test("the sidebar toggle reports whether the sidebar is open", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle navigation sidebar" });

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("the mobile menu toggle reports state and the closed menu is not focusable", async ({ page }) => {
    await page.setViewportSize({ width: 382, height: 580 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle mobile menu" }).filter({ visible: true });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#mobile-menu")).toHaveAttribute("inert", "");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).not.toHaveAttribute("inert");
  });
});
