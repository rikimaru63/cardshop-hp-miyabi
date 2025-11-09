import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Card Shop International/i);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Card Shop/i);
  });

  test('should display navigation menu', async ({ page }) => {
    // Check navigation links
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: /ポケモン/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /ワンピース/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /遊戯王/i })).toBeVisible();
  });

  test('should display featured products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount.greaterThan(0);
  });

  test('should have working cart button', async ({ page }) => {
    const cartButton = page.locator('[data-testid="cart-button"]');
    await expect(cartButton).toBeVisible();
    
    // Click cart button
    await cartButton.click();
    
    // Check if cart drawer opens
    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
  });

  test('should navigate to category page', async ({ page }) => {
    // Click on Pokemon category
    await page.getByRole('link', { name: /ポケモン/i }).click();
    
    // Check URL changed
    await expect(page).toHaveURL(/.*category\/pokemon/);
    
    // Check category page content
    await expect(page.locator('h1')).toContainText(/ポケモン/);
  });

  test('should search for products', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill('Charizard');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(1000);
    
    // Check if search results are displayed
    const results = page.locator('[data-testid="search-results"]');
    await expect(results).toBeVisible();
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Check hamburger menu is visible
    const hamburgerMenu = page.locator('[data-testid="mobile-menu-button"]');
    await expect(hamburgerMenu).toBeVisible();
    
    // Click hamburger menu
    await hamburgerMenu.click();
    
    // Check mobile navigation is visible
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
  });

  test('should navigate via mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open mobile menu
    await page.locator('[data-testid="mobile-menu-button"]').click();
    
    // Click on a category
    await page.getByRole('link', { name: /ワンピース/i }).click();
    
    // Check navigation worked
    await expect(page).toHaveURL(/.*category\/one-piece/);
  });
});