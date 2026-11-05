import { test, expect } from "@playwright/test";

test("the mobile menu's button goes to the contact page", async ({ page }) => {
  await page.setViewportSize({ width: 382, height: 580 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle mobile menu" }).filter({ visible: true }).click();

  const contactLink = page.locator("#mobile-menu").getByRole("link", { name: "Contact" });
  await expect(contactLink).toHaveAttribute("href", "/contact");
  await contactLink.click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("the footer offers no language choices the site doesn't support", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Select language" })).toHaveCount(0);
});
