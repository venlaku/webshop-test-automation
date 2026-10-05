import { test, expect } from '../fixtures/pages';
import { USERS } from '../test-data/users';
import { PASSWORD } from '../utils/helpers';

test.describe('Login', () => {
  test('invalid login attempts are rejected', async ({ page, loginPage }) => {
    const cases = [
      { case: 'empty username', user: '', pass: PASSWORD, msg: 'Username is required' },
      { case: 'empty password', user: USERS.standard, pass: '', msg: 'Password is required' },
      { case: 'wrong password', user: USERS.standard, pass: 'wrong', msg: 'do not match any user' },
      { case: 'locked out user', user: USERS.lockedOut, pass: PASSWORD, msg: 'locked out' },
    ];

    for (const c of cases) {
      await test.step(c.case, async () => {
        await loginPage.login(c.user, c.pass);
        await expect(loginPage.error).toContainText(c.msg);
        await expect(page).not.toHaveURL(/inventory/);
      });
    }
  });

  test('valid login grants access and logout removes it', async ({ page, loginPage, inventoryPage }) => {
    await inventoryPage.goto();
    await expect(loginPage.error).toContainText('when you are logged in');

    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');

    await inventoryPage.header.logout();
    await expect(loginPage.loginButton).toBeVisible();

    await inventoryPage.goto();
    await expect(loginPage.error).toContainText('when you are logged in');
  });
});
