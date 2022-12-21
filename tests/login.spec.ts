import { test, chromium } from '@playwright/test';

test('login', async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Email address').fill('gilshechter13@gmail.com');
    await page.getByPlaceholder('Password').fill('Gil061295');
    await page.click('button[type="submit"]');
  })