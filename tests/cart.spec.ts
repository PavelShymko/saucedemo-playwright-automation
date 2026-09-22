import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { LoginPage } from "../page-objects/LoginPage";
import { Menu } from "../page-objects/menu";
import { CartPage } from "../page-objects/CartPage";
import { CheckoutPage } from "../page-objects/CheckoutPage";

test.use({launchOptions: {slowMo: 100 }})
test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html/')
})

/* Add/remove products
Cart counter
Cart contains correct product/price
 */

test.describe('cart functionality', () => {

  test('add to cart button works correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
  })

  test('remove from cart button works correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    await productsPage.removeFromCartFirstProduct()
  })

  test('cart counter updates correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
    await productsPage.removeFromCartFirstProduct()
    await expect(cartCounter).not.toBeVisible()
  })
  
  test('cart contains correct product and price', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openFirstProduct()
    const productName = await page.locator('.inventory_details_name').innerText()
    const productPrice = await page.locator('.inventory_details_price').innerText()
    await productsPage.addToCartFirstProduct()
    await page.getByRole('button', { name: 'Cart' }).click()
    const cartProductName = await page.locator('.inventory_item_name').innerText()
    const cartProductPrice = await page.locator('.inventory_item_price').innerText()
    expect(cartProductName).toBe(productName)
    expect(cartProductPrice).toBe(productPrice)
  })

  test('cart retains products after page reload', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    await page.reload()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })

  test('cart retains products after navigating away and back', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    await page.goto('/inventory.html/')
    await cartPage.openCart()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })
  
  test('cart retains products after logging out and back in', async ({ page }) => { 
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const menu = new Menu(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    await menu.logout()
    await loginPage.login('standard_user', 'secret_sauce')
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).toHaveText('1')
  })

  test('cart is cleared after checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.openFirstProduct()
    await productsPage.addToCartFirstProduct()
    await cartPage.openCart()
    await page.getByRole('button', { name: 'Checkout' }).click()
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await checkoutPage.finishCheckout()
    const cartCounter = page.locator('.shopping_cart_badge')
    await expect(cartCounter).not.toBeVisible()
  })
})