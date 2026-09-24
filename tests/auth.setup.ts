    import { test as setup, expect } from '@playwright/test';
    import {users} from '../test-data/users'
    import path from 'path';

    const authFile = path.join(__dirname, '../playwright/.auth/user.json');

    setup('authenticate', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill(users.standard.username);
        await page.getByPlaceholder('Password').fill(users.standard.password);
        await page.getByRole('button', { name: 'Login' }).click();
    
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.getByText('Products')).toBeVisible();

        await page.context().storageState({ path: authFile });
    });