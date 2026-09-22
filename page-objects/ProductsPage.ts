import { Page } from '@playwright/test'
import { expect } from '@playwright/test'


export class ProductsPage {


  constructor(private page: Page) {
    this.page = page

  }

  async openFirstProduct() {
    const firstProduct = this.page.locator('.inventory_item').first()
    const productName = firstProduct.locator('.inventory_item_name')
    await productName.click()
  }

  async addToCartFirstProduct() {
    await expect(this.page).toHaveURL(/inventory-item.html\?id=\d+/)
    const addToCartButton = this.page.getByRole('button', { name: 'Add to cart' })
    const removeButton = this.page.getByRole('button', { name: 'Remove' })
    await addToCartButton.click()
    await expect(removeButton).toBeVisible()
    await expect(addToCartButton).not.toBeVisible()
    await expect(removeButton).toHaveText('Remove')
  }

  async removeFromCartFirstProduct() {
    await expect(this.page).toHaveURL(/inventory-item.html\?id=\d+/)
    const removeButton = this.page.getByRole('button', { name: 'Remove' })
    const addToCartButton = this.page.getByRole('button', { name: 'Add to cart' })
    await removeButton.click()
    await expect(addToCartButton).toBeVisible()
    await expect(removeButton).not.toBeVisible()
    await expect(addToCartButton).toHaveText('Add to cart')
  }
  
}
