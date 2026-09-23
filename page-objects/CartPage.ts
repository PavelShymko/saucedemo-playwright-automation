import { Page, expect } from '@playwright/test'

export class CartPage {
  constructor(private page: Page) {
    this.page = page
  }

  async openCart() {
    const cartLink = this.page.locator('[data-test="shopping-cart-link"]')
    await expect(cartLink).toBeVisible()
    await cartLink.click()  }
  
  async getCartCounter() {
    const cartCounter = this.page.locator('.shopping_cart_badge')
    return cartCounter
  }

  async getCartProductName() {
    const cartProductName = await this.page.locator('.inventory_item_name').innerText()
    return cartProductName
  }

  async getCartProductPrice() {
    const cartProductPrice = await this.page.locator('.inventory_item_price').innerText()
    return cartProductPrice
  }
  async removeFirstProductFromCart() {
    const removeButton = this.page.getByRole('button', { name: 'Remove' }).first()
    await expect(removeButton).toBeVisible()
    await removeButton.click()
  }

}