import { test, expect } from "@playwright/test";

test.describe("Education Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/education");
    });

    test("loads successfully", async ({ page }) => {
        await expect(page).toHaveTitle(/Furqan Agwan/);
        await expect(
            page.getByRole("heading", { name: "Education" })
        ).toBeVisible();
    });

    test("displays education entries", async ({ page }) => {
        // Check for University or specific text
        // "De Montfort University" is likely present based on typical content
        await expect(page.getByText(/University/i).first()).toBeVisible();
    });
});
