import { test, expect } from '../fixtures/test-fixtures'

test.use({ launchOptions: { slowMo: 60 } })
test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html/')
})

test('open empty checkout page', async ({ page, cartPage, checkoutPage }) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await expect(page).toHaveURL(/checkout-step-one.html/)
})

test('fill checkout information and finish checkout', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
  await checkoutPage.finishCheckout()
  await expect(page).toHaveURL(/checkout-complete.html/)
})

test('checkout information is required - all fields', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('', '', '')
  await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test('checkout information is required - last name', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', '', '12345')
  await expect(page.getByText('Error: Last Name is required')).toBeVisible()
})

test('checkout information is required - postal code', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '')
  await expect(page.getByText('Error: Postal Code is required')).toBeVisible()
})

test('checkout information is required - first name', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('', 'Doe', '12345')
  await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test('cancel checkout and return to cart', async ({
  page,
  cartPage,
  checkoutPage,
}) => {
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page).toHaveURL(/cart.html/)
})

test('display correct product information on checkout page', async ({
  page,
  productsPage,
  cartPage,
}) => {
  await productsPage.openFirstProduct()
  const productName = await page.locator('.inventory_details_name').innerText()
  const productPrice = await page
    .locator('.inventory_details_price')
    .innerText()
  await productsPage.addProductToCart()
  await cartPage.openCart()
  const checkoutProductName = await page
    .locator('.inventory_item_name')
    .innerText()
  const checkoutProductPrice = await page
    .locator('.inventory_item_price')
    .innerText()
  expect(checkoutProductName).toBe(productName)
  expect(checkoutProductPrice).toBe(productPrice)
})
test('display correct product information on checkout overview page', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.openFirstProduct()
  const productName = await page.locator('.inventory_details_name').innerText()
  const productPrice = await page
    .locator('.inventory_details_price')
    .innerText()
  await productsPage.addProductToCart()
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
  const overviewProductName = await page
    .locator('.inventory_item_name')
    .innerText()
  const overviewProductPrice = await page
    .locator('.inventory_item_price')
    .innerText()
  expect(overviewProductName).toBe(productName)
  expect(overviewProductPrice).toBe(productPrice)
})

test('complete purchase successfully', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.openFirstProduct()
  await productsPage.addProductToCart()
  await cartPage.openCart()
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
  await checkoutPage.finishCheckout()
  await expect(page.locator('.complete-header')).toHaveText(
    'Thank you for your order!',
  )
})

test('add two products to cart and complete purchase successfully', async ({
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
  await checkoutPage.openCheckout()
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
  await checkoutPage.finishCheckout()
  await expect(page.locator('.complete-header')).toHaveText(
    'Thank you for your order!',
  )
})
