# SauceDemo Playwright Automation

End-to-end test automation project for the [SauceDemo](https://www.saucedemo.com/) web application using Playwright and TypeScript.

The project covers UI testing of the main user flows, API testing, Page Object Model, reusable fixtures, test data management, and CI execution with GitHub Actions.

## Tech Stack

* **Playwright** 1.63
* **TypeScript**
* **Node.js** 20+
* **Playwright Test**
* **GitHub Actions**
* **REST API testing**
* **Page Object Model (POM)**

## Test Coverage

The project currently contains **39 automated tests** covering the following areas:

### Login

* Successful login
* Invalid credentials
* Empty credentials
* Empty username
* Empty password
* Locked-out user

### Product Catalog

* Product list is displayed correctly
* Sort products by price: low to high
* Sort products by price: high to low
* Sort products by name: A to Z
* Sort products by name: Z to A
* Product details validation
* Return to product list
* Add product to cart

### Shopping Cart

* Add product to cart
* Remove product from cart
* Cart counter
* Product name and price validation
* Cart persistence after page reload
* Cart persistence after navigation
* Cart persistence after logout and login
* Cart is cleared after checkout
* Continue shopping
* Remove one product and complete purchase

### Checkout

* Open empty checkout page
* Fill checkout information and complete purchase
* Required checkout fields validation
* Cancel checkout
* Product information on checkout page
* Product information on checkout overview
* Complete purchase
* Purchase with multiple products

### API Testing

API tests are implemented using Playwright's `request` fixture against the public ReqRes REST API.

Current API scenarios include:

* GET users and validate HTTP 200 response
* GET a specific user and validate response data
* GET a non-existing user and validate HTTP 404 response

## Project Structure

```text
saucedemo-playwright-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── test-fixtures.ts
│
├── page-objects/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── menu.ts
│
├── test-data/
│   ├── checkout.ts
│   └── users.ts
│
├── tests/
│   ├── api/
│   │   └── users-api.spec.ts
│   ├── auth.setup.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   └── product-catalog.spec.ts
│
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Page Object Model

The project uses the **Page Object Model** to separate application interactions from test scenarios.

Page objects contain reusable locators and methods for interacting with the application:

* `LoginPage` - login functionality and login validation
* `ProductsPage` - product catalog and product interactions
* `CartPage` - shopping cart operations
* `CheckoutPage` - checkout and purchase flow
* `menu.ts` - application menu interactions

This keeps test cases focused on user behavior and assertions instead of low-level page interactions.

## Fixtures

Custom Playwright fixtures are used to provide reusable page objects to tests.

For example, tests can receive `loginPage`, `productsPage`, `cartPage`, and `checkoutPage` directly through the Playwright test fixture.

This reduces repeated setup code and keeps test files easier to read.

## Test Data

Test data is separated from test logic.

The `test-data` directory contains:

* `users.ts` - SauceDemo user credentials
* `checkout.ts` - checkout data

This makes test data easier to maintain and reuse.

## Authentication

The project uses Playwright's `storageState` for authenticated Chromium tests.

The authentication setup logs in with a standard SauceDemo user and saves the authenticated browser state to:

```text
playwright/.auth/user.json
```

The authentication state is excluded from Git using `.gitignore`.

## API Testing

API testing is implemented using Playwright's built-in `request` fixture.

Unlike UI tests, API tests do not open a browser. They send HTTP requests directly and validate:

* HTTP status codes
* response structure
* response data
* negative scenarios

The API tests are located in:

```text
tests/api/users-api.spec.ts
```

The API testing demonstrates the ability to combine UI and API testing within the same Playwright project.

## Cross-Browser Testing

The Playwright configuration includes projects for:

* Chromium
* Firefox
* WebKit

The local configuration can therefore be used to execute the UI test suite against different browser engines.

GitHub Actions currently runs the test suite using Chromium to keep CI execution fast and stable.

## CI/CD

The project uses **GitHub Actions** for continuous integration.

Tests are automatically triggered on:

* push to `main`
* pull requests targeting `main`

The CI pipeline:

1. Checks out the repository
2. Installs Node.js 20
3. Installs project dependencies using `npm ci`
4. Installs Chromium and required Playwright dependencies
5. Runs the Playwright test suite

The workflow is located at:

```text
.github/workflows/playwright.yml
```

## Playwright Configuration

The project uses:

* parallel test execution
* retries in CI
* HTML reporting
* trace collection on the first retry
* separate browser projects
* authentication setup project

The base URL is configured for SauceDemo, allowing tests to use relative paths instead of repeating the full application URL.

## How to Run

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run tests in Chromium

```bash
npx playwright test --project=chromium
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run API tests

```bash
npx playwright test tests/api/users-api.spec.ts
```

### Run tests with the line reporter

```bash
npx playwright test --reporter=line
```

### Open the HTML report

```bash
npx playwright show-report
```

## Test Reporting

Playwright HTML Reporter is configured for the project.

For failed or retried tests, Playwright can collect a trace that can be opened for debugging.

The project also uses Playwright's automatic waiting and web-first assertions instead of fixed delays wherever possible.

## Project Goals

This project was created as a practical QA automation portfolio project to demonstrate:

* UI test automation with Playwright
* TypeScript-based test development
* Page Object Model
* Reusable Playwright fixtures
* Test data separation
* API testing
* Positive and negative testing
* Cross-browser configuration
* Authentication state management
* CI/CD with GitHub Actions
* Test reporting and debugging

## Repository

**GitHub:**
https://github.com/PavelShymko/saucedemo-playwright-automation