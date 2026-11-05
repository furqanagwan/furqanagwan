import { test, expect } from "@playwright/test";

test.describe("Experiences Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/experiences");
    });

    test("loads successfully", async ({ page }) => {
        await expect(page).toHaveTitle(/Furqan Agwan/);
        await expect(
            page.getByRole("heading", { name: "Experience", exact: true })
        ).toBeVisible();
    });

    test("displays timeline items", async ({ page }) => {

        await expect(page.getByText(/Lead Software Engineer/i).or(page.getByText(/Software Engineer/i)).first()).toBeVisible();
    });
});
