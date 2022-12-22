import { test, chromium, expect } from '@playwright/test';

test('products', async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Email address').fill('gilshechter13@gmail.com');
    await page.getByPlaceholder('Password').fill('Gil061295');
    await page.click('button[type="submit"]');
    await page.getByText('Add to cart').nth(0).click();
    await page.getByText('Add to cart').nth(1).click();
    await page.getByText('Add to cart').nth(2).click();
    expect(page.getByText('3')).toBeTruthy();
})