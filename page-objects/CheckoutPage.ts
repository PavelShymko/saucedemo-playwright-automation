import { Page, expect } from '@playwright/test'

export class CheckoutPage {
  constructor(private page: Page) {
    this.page = page
  }

  async openCheckout() {
    const checkoutButton = this.page.getByRole('button', { name: 'Checkout' })
    await expect(checkoutButton).toBeVisible()
    await checkoutButton.click()
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName)
    await this.page.getByPlaceholder('Last Name').fill(lastName)
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode)
    await this.page.getByRole('button', { name: 'Continue' }).click()
  }

  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Finish' }).click()
  }
}