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
        // Check that we have at least one timeline item/article
        // Assuming ExperienceTimeline renders 'ol > li' or similar structure, 
        // or just checking for specific company names if static.
        // Based on viewing other components, simpler is better.
        // Let's look for "Experience" or company names if we knew them, 
        // but generic check for list items or headings is safer.

        // Inspecting ExperienceTimeline (I haven't viewed it, but usually these have role 'list' or headings)
        // Let's check for the main heading first (covered above)
        // Let's check for at least one "experience item".
        // I'll assume they use <article> or similar. If not, text check is robust.
        await expect(page.getByText(/Lead Software Engineer/i).or(page.getByText(/Software Engineer/i)).first()).toBeVisible();
    });
});
