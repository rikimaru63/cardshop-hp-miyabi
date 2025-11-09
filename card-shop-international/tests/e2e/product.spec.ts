import { test, expect } from '@playwright/test';

test.describe('Product Pages', () => {
  test('should display product list page', async ({ page }) => {
    await page.goto('/products');
    
    // Check page title
    await expect(page.locator('h1')).toContainText(/商品一覧|Products/i);
    
    // Check products are displayed
    await page.waitForSelector('[data-testid="product-card"]');
    const products = page.locator('[data-testid="product-card"]');
    await expect(products).toHaveCount.greaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/products');
    
    // Select Pokemon category filter
    await page.selectOption('[data-testid="category-filter"]', 'pokemon');
    
    // Wait for filtered results
    await page.waitForTimeout(1000);
    
    // Check all products are Pokemon
    const productCategories = page.locator('[data-testid="product-category"]');
    const count = await productCategories.count();
    
    for (let i = 0; i < count; i++) {
      await expect(productCategories.nth(i)).toContainText(/ポケモン|Pokemon/i);
    }
  });

  test('should sort products by price', async ({ page }) => {
    await page.goto('/products');
    
    // Select price sort
    await page.selectOption('[data-testid="sort-select"]', 'price-asc');
    
    // Wait for sort to apply
    await page.waitForTimeout(1000);
    
    // Get all prices
    const prices = await page.locator('[data-testid="product-price"]').allTextContents();
    const numericPrices = prices.map(p => parseInt(p.replace(/[^0-9]/g, '')));
    
    // Check prices are in ascending order
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
    }
  });

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/products');
    
    // Click first product
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    const productName = await firstProduct.locator('[data-testid="product-name"]').textContent();
    await firstProduct.click();
    
    // Check we're on product detail page
    await expect(page).toHaveURL(/.*products\/.+/);
    
    // Check product name is displayed
    await expect(page.locator('h1')).toContainText(productName || '');
  });
});

test.describe('Product Detail Page', () => {
  test('should display product information', async ({ page }) => {
    // Go to a specific product page
    await page.goto('/products/poke-001');
    
    // Check product elements are present
    await expect(page.locator('h1')).toBeVisible(); // Product name
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-to-cart-button"]')).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/products/poke-001');
    
    // Get initial cart count
    const cartButton = page.locator('[data-testid="cart-button"]');
    const initialCount = await cartButton.locator('[data-testid="cart-count"]').textContent() || '0';
    
    // Add to cart
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Check success message
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/カートに追加しました|Added to cart/i);
    
    // Check cart count increased
    const newCount = await cartButton.locator('[data-testid="cart-count"]').textContent() || '0';
    expect(parseInt(newCount)).toBeGreaterThan(parseInt(initialCount));
  });

  test('should handle out of stock products', async ({ page }) => {
    // Navigate to an out of stock product (you'll need to set this up)
    await page.goto('/products/out-of-stock-item');
    
    // Check add to cart button is disabled
    const addButton = page.locator('[data-testid="add-to-cart-button"]');
    await expect(addButton).toBeDisabled();
    await expect(addButton).toContainText(/在庫切れ|Out of Stock/i);
  });

  test('should display product image gallery', async ({ page }) => {
    await page.goto('/products/poke-001');
    
    // Check main image is displayed
    const mainImage = page.locator('[data-testid="product-image-main"]');
    await expect(mainImage).toBeVisible();
    
    // Check thumbnail images if present
    const thumbnails = page.locator('[data-testid="product-image-thumbnail"]');
    if (await thumbnails.count() > 0) {
      // Click first thumbnail
      await thumbnails.first().click();
      
      // Check main image changed
      await page.waitForTimeout(500);
      // You'd need to implement logic to verify the image actually changed
    }
  });
});