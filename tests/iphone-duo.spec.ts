import { test, expect } from "@playwright/test";

/**
 * iPhone Duo viewport sizes (CSS px) in Safari 27.1, as published by WebKit.
 * Width ranges from 382 (outer screen) to 951 (inner screen, landscape).
 */
const DUO_POSES = [
  { name: "outer portrait", width: 382, height: 580 },
  { name: "outer landscape", width: 594, height: 368 },
  { name: "inner portrait", width: 669, height: 867 },
  { name: "inner landscape", width: 951, height: 585 },
  { name: "inner split view", width: 385, height: 571 },
] as const;

const PAGES = ["/", "/blog", "/projects", "/experiences", "/qualifications"];

for (const pose of DUO_POSES) {
  test.describe(`iPhone Duo - ${pose.name} (${pose.width}x${pose.height})`, () => {
    test.use({
      viewport: { width: pose.width, height: pose.height },
      hasTouch: true,
    });

    for (const path of PAGES) {
      test(`${path} fits the screen without sideways scrolling`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState("domcontentloaded");

        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);

        // The site name is always reachable at the top of the screen.
        // (The mobile and desktop headers each have one; only one is shown.)
        await expect(
          page
            .getByRole("link", { name: /furqanagwan|home/i })
            .filter({ visible: true })
            .first(),
        ).toBeVisible();
      });
    }
  });
}
