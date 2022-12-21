import { test, chromium } from '@playwright/test';

test('signup', async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4200/signup');
    await page.getByPlaceholder('Name').fill('Gil');
    await page.getByPlaceholder('Email address').fill('gil@gmail.com');
    await page.getByPlaceholder('Password ').fill('G123456');
    await page.getByPlaceholder('Confirm Password').fill('G123456');
    await page.click('button[type="submit"]');
  })