# Test Design: SauceDemo

## Approach

I chose tests by risk: what costs the business most if it breaks, and where bugs are most likely. Each of the six tests covers a different risk, and together they cover the full customer path: log in, add to cart, check out.

## Features, risks and tests

| Feature | Risk | Test and how it validates |
|---|---|---|
| Purchase flow | Customers cannot order, which stops revenue | **User can complete a purchase:** buys a product and checks the confirmation and empty cart |
| Price calculation | Wrong totals cause financial loss | **Order totals are calculated correctly:** subtotal equals item prices, total equals subtotal plus tax |
| Access control | Store reachable without login or after logout | **Valid login grants access and logout removes it:** store is blocked, opens after login, blocked again after logout |
| Login validation | Wrong users get in or errors are unclear | **Invalid login attempts are rejected:** empty fields, wrong password and locked user each show the right error (one `test.step` per case) |
| Cart state | Badge and cart contents get out of sync | **Items can be added and removed:** badge and cart match after adding, removing and reloading |
| Checkout form | Orders without delivery details | **Checkout requires all fields:** each missing field shows an error and blocks the order |

## What I left out and why

- **Product sorting and filtering:** a failure does not stop a purchase, so it is lower priority.
- **Intentionally broken users** (`problem_user`, `error_user`, `visual_user`): useful for showing that tests catch defects, and the next tests I would add.
- **Performance** (`performance_glitch_user`): better covered by dedicated performance tools than by functional UI tests.
- **Cross-browser and mobile runs:** the suite runs on Chromium only. Adding Firefox, WebKit and a mobile viewport is a config change, not new tests.


## Maintainability

The suite uses the Page Object Model: each page's locators and actions live in one class in `pages/`, so a site change is fixed in one place. Page objects are passed to tests as fixtures, and assertions stay in the specs. Locators use the site's `data-test` attributes, and the password is read from `.env`. Each test runs in an isolated browser context, so no cleanup is needed between tests.
