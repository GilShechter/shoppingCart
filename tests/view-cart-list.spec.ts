import { test, chromium, expect } from '@playwright/test';

test('products', async() => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Email address').fill('gilshechter13@gmail.com');
    await page.getByPlaceholder('Password').fill('Gil061295');
    await page.click('button[type="submit"]');
    await page.getByText('Add to cart').nth(0).click();
    await page.getByText('Add to cart').nth(1).click();
    await page.getByText('Add to cart').nth(2).click();
    await page.getByRole('listitem').filter({ hasText: 'Cart' }).click();
    expect(page.getByText('3')).toBeTruthy();
    await page.click('button.btn.btn-danger');
    await page.click('button.btn.btn-danger');
    await page.click('button.btn.btn-danger');
    expect(page.getByText('0')).toBeTruthy();
})