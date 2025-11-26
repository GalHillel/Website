import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
    test('Complete Admin Lifecycle', async ({ page }) => {
        // 1. Login
        await page.goto('/admin');
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'password123');
        await page.click('button:has-text("Log in")');
        await expect(page).toHaveURL('/admin');
        await expect(page.locator('text=Edit Profile')).toBeVisible();

        // 2. Profile Update Test
        const newTagline = 'Automated Test Tagline';
        await page.fill('input[name="tagline"]', newTagline);
        await page.click('button:has-text("Save Profile")');
        // Handle alert
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Profile saved!');
            await dialog.accept();
        });

        // Verify on Home Page
        await page.goto('/');
        await expect(page.locator(`text=${newTagline}`)).toBeVisible();

        // Cleanup Profile (Optional but good practice)
        await page.goto('/admin');
        await page.fill('input[name="tagline"]', 'Software Developer'); // Reset to default-ish
        await page.click('button:has-text("Save Profile")');

        // 3. Project CRUD Test
        // Add Project
        await page.click('button:has-text("Projects")'); // Switch tab
        await page.fill('input[name="title"]', 'Test Project');
        await page.fill('textarea[name="description"]', 'Test Desc');
        await page.click('button:has-text("Add Project")');
        // Verify added
        await expect(page.locator('h4:has-text("Test Project")')).toBeVisible();

        // Delete Project
        // Assuming the new project is at the bottom or we can find it by text
        const deleteBtn = page.locator('div:has-text("Test Project")').locator('button:has-text("Delete")');
        page.once('dialog', dialog => dialog.accept()); // Accept confirmation
        await deleteBtn.click();
        await expect(page.locator('h4:has-text("Test Project")')).not.toBeVisible();

        // 4. Skill CRUD Test
        // Add Skill
        await page.click('button:has-text("Skills")'); // Switch tab
        await page.fill('input[name="category"]', 'Test Cat');
        await page.fill('input[name="name"]', 'Test Skill');
        await page.fill('input[name="proficiency"]', '50');
        await page.click('button:has-text("Add Skill")');
        // Verify added
        await expect(page.locator('h4:has-text("Test Skill")')).toBeVisible();

        // Delete Skill
        const deleteSkillBtn = page.locator('div:has-text("Test Skill")').locator('button:has-text("×")');
        page.once('dialog', dialog => dialog.accept()); // Accept confirmation
        await deleteSkillBtn.click();
        await expect(page.locator('h4:has-text("Test Skill")')).not.toBeVisible();

        // 5. Logout
        await page.click('button:has-text("Logout")');
        await expect(page).toHaveURL('/');

        // Verify blocked access
        await page.goto('/admin');
        await expect(page).toHaveURL(/\/auth\/signin/);
    });
});
