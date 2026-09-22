import {Page, expect} from "@playwright/test";

export class Menu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenu() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout() {
    await this.openMenu();
    const logoutButton = this.page.getByText('Logout', { exact: true });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await expect(this.page).toHaveURL('/')
  }

}