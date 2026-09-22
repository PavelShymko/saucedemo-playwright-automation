    import { test as setup, expect } from '@playwright/test';
    import path from 'path';

    const authFile = path.join(__dirname, '../playwright/.auth/user.json');

    setup('authenticate', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
    
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.getByText('Products')).toBeVisible();

        await page.context().storageState({ path: authFile });
    });