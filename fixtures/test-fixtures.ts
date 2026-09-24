import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductsPage } from '../page-objects/ProductsPage'
import { CartPage } from '../page-objects/CartPage'
import { CheckoutPage } from '../page-objects/CheckoutPage'
import { Menu } from '../page-objects/menu'

type Fixtures = {
  loginPage: LoginPage
  productsPage: ProductsPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  menu: Menu
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  menu: async ({ page }, use) => {
    await use(new Menu(page))
  },
})

export { expect }
