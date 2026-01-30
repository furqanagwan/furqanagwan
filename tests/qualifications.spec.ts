import { test, expect } from "@playwright/test";

test.describe("Qualifications Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/qualifications");
    });

    test("loads successfully", async ({ page }) => {
        await expect(page).toHaveTitle(/Furqan Agwan/);
        await expect(
            page.getByRole("heading", { name: "Qualifications" })
        ).toBeVisible();
    });

    test("displays certification items", async ({ page }) => {
        // Check for generic certificate validation or specific text
        // Usually these are lists.
        // Check for generic certificate validation or specific text
        // Usually these are lists, but might be divs.
        // await expect(page.locator("ul").first()).toBeVisible();
        await expect(page.getByText(/Microsoft/i).or(page.getByText(/Azure/i)).first()).toBeVisible();
    });
});
