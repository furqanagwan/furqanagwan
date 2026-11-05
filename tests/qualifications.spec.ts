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
        await expect(page.getByText(/Microsoft/i).or(page.getByText(/Azure/i)).first()).toBeVisible();
    });

    // Education lives on this page (there is no separate /education page).
    test("displays education entries", async ({ page }) => {
        await expect(page.getByText(/University/i).first()).toBeVisible();
    });
});
