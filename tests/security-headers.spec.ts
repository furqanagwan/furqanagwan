import { test, expect } from "@playwright/test";

const PAGES = ["/", "/blog", "/projects", "/experiences", "/qualifications", "/contact"];

for (const path of PAGES) {
  test(`${path} loads without Content Security Policy violations`, async ({ page }) => {
    const violations: string[] = [];
    page.on("console", (message) => {
      if (message.text().includes("Content Security Policy")) {
        violations.push(message.text());
      }
    });
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (event) => {
        console.error(`Content Security Policy violation: ${event.violatedDirective} ${event.blockedURI}`);
      });
    });

    const response = await page.goto(path);
    await page.waitForLoadState("networkidle");

    expect(response?.status()).toBeLessThan(400);
    expect(violations).toEqual([]);
  });
}

test("responses send a Content Security Policy and no deprecated XSS header", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["content-security-policy"]).toContain("object-src 'none'");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-xss-protection"]).toBeUndefined();
});
