import { test, expect, type Page } from "@playwright/test";

const WCAG_REFLOW_MINIMUM = { name: "WCAG reflow minimum", width: 320, height: 256 };

const SAMSUNG_FOLDABLE_SCREENS = [
  { name: "Galaxy Z Fold 7 cover", width: 360, height: 764 },
  { name: "Galaxy Z Fold 7 cover landscape", width: 788, height: 308 },
  { name: "Galaxy Z Fold 7 inner", width: 984, height: 1016 },
  { name: "Galaxy Z Flip 6 cover", width: 360, height: 298 },
  { name: "Galaxy Z Flip 6 cover landscape", width: 322, height: 308 },
  { name: "Galaxy Z Flip 7 cover", width: 474, height: 448 },
] as const;

const SHORT_PHONE_SCREENS = [
  WCAG_REFLOW_MINIMUM,
  { name: "Galaxy Z Flip 6 cover", width: 360, height: 298 },
  { name: "iPhone Duo outer landscape", width: 594, height: 368 },
] as const;

const SHORT_DESKTOP_SCREENS = [
  { name: "Galaxy Z Fold 7 cover landscape", width: 788, height: 308 },
  { name: "Galaxy Z Flip 6 landscape", width: 828, height: 308 },
] as const;

const PAGES = ["/", "/blog", "/projects", "/experiences", "/qualifications", "/contact"];

async function measureSidewaysOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

for (const device of [WCAG_REFLOW_MINIMUM, ...SAMSUNG_FOLDABLE_SCREENS]) {
  test.describe(`${device.name} (${device.width}x${device.height})`, () => {
    test.use({ viewport: { width: device.width, height: device.height }, hasTouch: true });

    for (const path of PAGES) {
      test(`${path} fits the screen without sideways scrolling`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("domcontentloaded");
        expect(await measureSidewaysOverflow(page)).toBeLessThanOrEqual(0);
      });
    }
  });
}

for (const device of SHORT_PHONE_SCREENS) {
  test.describe(`Mobile menu on ${device.name} (${device.width}x${device.height})`, () => {
    test.use({ viewport: { width: device.width, height: device.height }, hasTouch: true });

    test("the Contact button sits below every menu item", async ({ page }) => {
      await page.goto("/experiences");
      await page.getByRole("button", { name: "Toggle mobile menu" }).filter({ visible: true }).click();

      const menu = page.locator("#mobile-menu");
      await expect(menu).not.toHaveAttribute("inert");

      const collapsedSections = menu.locator('nav button[aria-expanded="false"]');
      while ((await collapsedSections.count()) > 0) {
        await collapsedSections.first().click();
      }

      const lastItem = menu.locator("nav li").last();
      const contact = menu.getByRole("link", { name: "Contact" });

      await expect(async () => {
        const lastItemBox = await lastItem.boundingBox();
        const contactBox = await contact.boundingBox();
        expect(lastItemBox).not.toBeNull();
        expect(contactBox).not.toBeNull();
        expect(contactBox?.y ?? 0).toBeGreaterThanOrEqual(
          (lastItemBox?.y ?? Infinity) + (lastItemBox?.height ?? 0),
        );
      }).toPass();

      await contact.scrollIntoViewIfNeeded();
      await expect(contact).toBeInViewport();
    });
  });
}

for (const device of SHORT_DESKTOP_SCREENS) {
  test.describe(`Sidebar on ${device.name} (${device.width}x${device.height})`, () => {
    test.use({ viewport: { width: device.width, height: device.height } });

    test("every sidebar link can be reached", async ({ page }) => {
      await page.goto("/experiences");
      const sidebar = page.locator("#sidebar-navigation");

      const collapsedSections = sidebar.locator('button[aria-expanded="false"]');
      while ((await collapsedSections.count()) > 0) {
        await collapsedSections.first().click();
      }

      const links = sidebar.getByRole("link");
      const count = await links.count();
      expect(count).toBeGreaterThan(0);

      for (let index = 0; index < count; index++) {
        const link = links.nth(index);
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeInViewport();
      }
    });
  });
}
