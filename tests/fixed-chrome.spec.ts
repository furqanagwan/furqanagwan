import { test, expect, type Locator, type Page } from "@playwright/test";

const SCROLL_DISTANCE = 400;
const DESKTOP = { width: 1280, height: 800 };

async function topOf(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box?.y ?? Number.NaN;
}

async function scrollPageBy(page: Page, distance: number) {
  await page.evaluate((y) => window.scrollTo(0, y), distance);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(distance);
}

test.describe("Header and sidebar stay in place while the page scrolls", () => {
  test.use({ viewport: DESKTOP });

  test("the sidebar links don't move when the page scrolls", async ({ page }) => {
    await page.goto("/experiences");
    const firstLink = page.locator("#sidebar-navigation").getByRole("link").first();
    const topBeforeScroll = await topOf(firstLink);

    await scrollPageBy(page, SCROLL_DISTANCE);

    expect(await topOf(firstLink)).toBeCloseTo(topBeforeScroll, 0);
    await expect(firstLink).toBeInViewport();
  });

  test("the header stays at the top when the page scrolls", async ({ page }) => {
    await page.goto("/experiences");
    const sidebarToggle = page.getByRole("button", { name: "Toggle navigation sidebar" });
    const topBeforeScroll = await topOf(sidebarToggle);

    await scrollPageBy(page, SCROLL_DISTANCE);

    expect(await topOf(sidebarToggle)).toBeCloseTo(topBeforeScroll, 0);
    await expect(sidebarToggle).toBeInViewport();
  });
});
