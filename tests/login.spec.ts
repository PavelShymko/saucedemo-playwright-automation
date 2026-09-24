import { test, expect } from '../fixtures/test-fixtures'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test('login with valid credentials', async ({ page, loginPage }) => {
  await loginPage.login('standard_user', 'secret_sauce')
  await expect(page).toHaveURL(/inventory.html/)
  await expect(page.getByText('Products')).toBeVisible()
})

test('login with invalid credentials', async ({ page, loginPage }) => {
  await loginPage.login('invalid_user', 'invalid_password')
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service',
    ),
  ).toBeVisible()
})

test('login with empty credentials', async ({ page, loginPage }) => {
  await loginPage.login('', '')
  await expect(
    page.getByText('Epic sadface: Username is required'),
  ).toBeVisible()
})

test('login with empty password', async ({ page, loginPage }) => {
  await loginPage.login('standard_user', '')
  await expect(
    page.getByText('Epic sadface: Password is required'),
  ).toBeVisible()
})

test('login with empty username', async ({ page, loginPage }) => {
  await loginPage.login('', 'secret_sauce')
  await expect(
    page.getByText('Epic sadface: Username is required'),
  ).toBeVisible()
})

test('login with locked out user', async ({ page, loginPage }) => {
  await loginPage.login('locked_out_user', 'secret_sauce')
  await expect(
    page.getByText('Epic sadface: Sorry, this user has been locked out.'),
  ).toBeVisible()
})
