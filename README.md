# SauceDemo Playwright Tests

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com/), written with Playwright and TypeScript. The suite has six tests that cover login, cart and checkout.

For which features and risks are tested and why, see [test_design.md](test_design.md).

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- Git

## Setup

Run these commands from the terminal, in order.

**1. Clone the repository**

```bash
git clone https://github.com/venlaku/webshop-test-automation.git
```

**2. Install dependencies**

```bash
npm ci
```

**3. Install the browser**

```bash
npx playwright install --with-deps chromium
```

On Linux this may ask for your `sudo` password.

**4. Create the `.env` file**

```bash
cp .env.example .env
```

Open `.env` and set the password shown under **"Password for all users"** on the [SauceDemo login page](https://www.saucedemo.com/):

```
SAUCE_PASSWORD=<password from the SauceDemo login page>
```

`.env` is ignored by git, so the password is never committed.

## Run the tests

One command run:

```bash
npm test
```

All six tests should pass.

| Command | What it does |
|---|---|
| `npm test` | Runs all tests |
| `npm run test:headed` | Runs tests with a visible browser |
| `npm run test:ui` | Opens Playwright UI mode for debugging |
| `npm run report` | Opens the HTML report from the latest run |

## Project structure

```
tests/        Test specs: login, cart and checkout
pages/        Page Objects with each page's locators and actions
fixtures/     Passes the page objects to the tests
test-data/    Usernames, products and checkout details
utils/        Reads the password from .env and parses prices
```

## Troubleshooting

- **`Missing environment variable: SAUCE_PASSWORD`:** `.env` is missing or empty. Repeat step 4.
- **`Executable doesn't exist`:** the browser is not installed. Repeat step 3.
- **`npm ci` fails:** `package-lock.json` is missing. Run `npm install` once and commit the lock file.
