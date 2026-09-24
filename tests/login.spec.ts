import { test, expect } from '../fixtures/test-fixtures'
import {users} from '../test-data/users'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test('login with valid credentials', async ({ page, loginPage }) => {
  await loginPage.login(users.standard.username, users.standard.password)
  await expect(page).toHaveURL(/inventory.html/)
  await expect(page.getByText('Products')).toBeVisible()
})

test('login with invalid credentials', async ({ page, loginPage }) => {
  await loginPage.login(users.invalidCredentials.username, users.invalidCredentials.password)
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
  await loginPage.login(users.standard.username, '')
  await expect(
    page.getByText('Epic sadface: Password is required'),
  ).toBeVisible()
})

test('login with empty username', async ({ page, loginPage }) => {
  await loginPage.login('', users.standard.password)
  await expect(
    page.getByText('Epic sadface: Username is required'),
  ).toBeVisible()
})

test('login with locked out user', async ({ page, loginPage }) => {
  await loginPage.login(users.lockedOut.username, users.lockedOut.password)
  await expect(
    page.getByText('Epic sadface: Sorry, this user has been locked out.'),
  ).toBeVisible()
})
