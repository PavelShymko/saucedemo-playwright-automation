import { test, expect } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage'


test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html/')
})

test('product list is displayed correctly', async ({ page }) => {
  const products = page.locator('.inventory_item')

  await expect(products).toHaveCount(6)
  await expect(products.first()).toContainText('Sauce Labs Backpack')
})

test.describe('product sorting', () => {

  test('sort by price low → high', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi') //price (low to high)
    const prices = page.locator('.inventory_item_price')
    const priceValues = await prices.allTextContents()
    const sortedPrices = [...priceValues].sort(
      (a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')),
    )
    expect(priceValues).toEqual(sortedPrices)
  })

  test('sort by price high → low', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('hilo') //price (high to low)
    const prices = page.locator('.inventory_item_price')
    const priceValues = await prices.allTextContents()
    const sortedPrices = [...priceValues].sort(
      (a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')),
    )
    expect(priceValues).toEqual(sortedPrices)
  })

  test('sort by name A → Z', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('az') //name (A to Z)
    const names = page.locator('.inventory_item_name')
    const nameValues = await names.allTextContents()
    const sortedNames = [...nameValues].sort()
    expect(nameValues).toEqual(sortedNames)
  })

  test('sort by name Z → A', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('za') //name (Z to A)
    const names = page.locator('.inventory_item_name')
    const nameValues = await names.allTextContents()
    const sortedNames = [...nameValues].sort().reverse()
    expect(nameValues).toEqual(sortedNames)
  })
})

test.describe('product details', () => {

    test('product details are displayed correctly', async ({ page }) => {
        const firstProduct = page.locator('.inventory_item').first()   
        const productName = await firstProduct.locator('.inventory_item_name')
        const productNameText = await productName.innerText()
        const productPrice = await firstProduct.locator('.inventory_item_price').innerText()
        await productName.click()

        await expect(page).toHaveURL(/inventory-item.html\?id=\d+/)
        await expect(page.locator('.inventory_details_name')).toHaveText(productNameText)
        await expect(page.locator('.inventory_details_price')).toHaveText(productPrice)
        await expect(page.locator('.inventory_details_desc')).toBeVisible()
        await expect(page.locator('.inventory_details_img')).toBeVisible()
        await expect(page.locator('.btn_inventory')).toBeVisible()
    })

    test('back button returns to product list', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.openFirstProduct()

        await expect(page).toHaveURL(/inventory-item.html\?id=\d+/)
        await page.getByRole('button', { name: 'Back to products' }).click()
        await expect(page).toHaveURL(/inventory.html/)
    })

    test('add to cart button works correctly', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.openFirstProduct()

        await expect(page).toHaveURL(/inventory-item.html\?id=\d+/)
        const addToCartButton = page.getByRole('button', { name: 'Add to cart' })
        await addToCartButton.click()
        await expect(addToCartButton).not.toBeVisible()
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
        
    })

})
