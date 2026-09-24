import { test, expect } from '../fixtures/test-fixtures'

test.use({ launchOptions: { slowMo: 100 } })
test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html/')
})

test.describe('cart functionality', () => {
  test('add to cart button works correctly', async ({ page, productsPage }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
  })

  test('remove from cart button works correctly', async ({
    page,
    productsPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await productsPage.removeFromCartFirstProduct()
  })

  test('cart counter updates correctly', async ({ page, productsPage }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
    await productsPage.removeFromCartFirstProduct()
    await expect(cartCounter).not.toBeVisible()
  })

  test('cart contains correct product and price', async ({
    page,
    productsPage,
  }) => {
    await productsPage.openFirstProduct()
    const productName = await page
      .locator('.inventory_details_name')
      .innerText()
    const productPrice = await page
      .locator('.inventory_details_price')
      .innerText()
    await productsPage.addProductToCart()
    await page.getByRole('button', { name: 'Cart' }).click()
    const cartProductName = await page
      .locator('.inventory_item_name')
      .innerText()
    const cartProductPrice = await page
      .locator('.inventory_item_price')
      .innerText()
    expect(cartProductName).toBe(productName)
    expect(cartProductPrice).toBe(productPrice)
  })

  test('cart retains products after page reload', async ({
    page,
    productsPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await page.reload()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })

  test('cart retains products after navigating away and back', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await page.goto('/inventory.html/')
    await cartPage.openCart()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })

  test('cart retains products after logging out and back in', async ({
    page,
    loginPage,
    productsPage,
    menu,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await menu.logout()
    await loginPage.login('standard_user', 'secret_sauce')
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })

  test('cart is cleared after checkout', async ({
    page,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await cartPage.openCart()
    await page.getByRole('button', { name: 'Checkout' }).click()
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await checkoutPage.finishCheckout()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).not.toBeVisible()
  })
  test('continue shopping button returns to product list', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await cartPage.openCart()
    await page.getByRole('button', { name: 'Continue Shopping' }).click()
    await expect(page).toHaveURL(/inventory.html/)
  })

  test('remove one product from cart and complete purchase successfully', async ({
    page,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.openFirstProduct()
    await productsPage.addProductToCart()
    await page.goto('/inventory.html/')
    await productsPage.openSecondProduct()
    await productsPage.addProductToCart()
    await cartPage.openCart()
    await cartPage.removeFirstProductFromCart()
    await checkoutPage.openCheckout()
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await checkoutPage.finishCheckout()
    await expect(page.locator('.complete-header')).toHaveText(
      'Thank you for your order!',
    )
  })
})
