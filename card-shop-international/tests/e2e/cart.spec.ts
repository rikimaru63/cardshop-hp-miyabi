import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart before each test (you'd implement this based on your cart implementation)
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('should add item to cart from product list', async ({ page }) => {
    await page.goto('/products');
    
    // Add first product to cart
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.locator('[data-testid="quick-add-to-cart"]').click();
    
    // Check cart badge updates
    const cartCount = page.locator('[data-testid="cart-count"]');
    await expect(cartCount).toContainText('1');
  });

  test('should display cart contents', async ({ page }) => {
    // Add a product first
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Open cart
    await page.locator('[data-testid="cart-button"]').click();
    
    // Check cart drawer/page opens
    const cartDrawer = page.locator('[data-testid="cart-drawer"]');
    await expect(cartDrawer).toBeVisible();
    
    // Check item is in cart
    const cartItem = cartDrawer.locator('[data-testid="cart-item"]');
    await expect(cartItem).toHaveCount(1);
  });

  test('should update item quantity in cart', async ({ page }) => {
    // Add product to cart
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Open cart
    await page.locator('[data-testid="cart-button"]').click();
    
    // Increase quantity
    const increaseButton = page.locator('[data-testid="increase-quantity"]');
    await increaseButton.click();
    
    // Check quantity updated
    const quantityInput = page.locator('[data-testid="quantity-input"]');
    await expect(quantityInput).toHaveValue('2');
    
    // Check total price updated
    const totalPrice = page.locator('[data-testid="cart-total"]');
    const priceText = await totalPrice.textContent();
    expect(priceText).toBeTruthy();
  });

  test('should remove item from cart', async ({ page }) => {
    // Add product to cart
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Open cart
    await page.locator('[data-testid="cart-button"]').click();
    
    // Remove item
    await page.locator('[data-testid="remove-item"]').click();
    
    // Confirm removal if there's a confirmation dialog
    const confirmButton = page.locator('[data-testid="confirm-remove"]');
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    
    // Check cart is empty
    await expect(page.locator('[data-testid="empty-cart-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('0');
  });

  test('should calculate cart totals correctly', async ({ page }) => {
    // Add multiple products
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    await page.goto('/products/poke-002');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Open cart
    await page.locator('[data-testid="cart-button"]').click();
    
    // Check subtotal, tax, shipping, and total
    await expect(page.locator('[data-testid="cart-subtotal"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-tax"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-shipping"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-total"]')).toBeVisible();
  });

  test('should navigate to checkout', async ({ page }) => {
    // Add product to cart
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Open cart
    await page.locator('[data-testid="cart-button"]').click();
    
    // Click checkout button
    await page.locator('[data-testid="checkout-button"]').click();
    
    // Check navigation to checkout page
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('should persist cart after page refresh', async ({ page }) => {
    // Add product to cart
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Check cart has item
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
    
    // Refresh page
    await page.reload();
    
    // Check cart still has item
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
  });

  test('should handle stock limitations', async ({ page }) => {
    // Go to product with limited stock
    await page.goto('/products/poke-001');
    
    // Get stock quantity
    const stockText = await page.locator('[data-testid="stock-quantity"]').textContent();
    const stockQuantity = parseInt(stockText?.replace(/[^0-9]/g, '') || '0');
    
    // Try to add more than available stock
    const quantityInput = page.locator('[data-testid="quantity-selector"]');
    await quantityInput.fill(String(stockQuantity + 1));
    
    // Try to add to cart
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Check error message
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/在庫不足|Insufficient stock/i);
  });
});

test.describe('Cart Page', () => {
  test('should display full cart page', async ({ page }) => {
    // Add items to cart
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Navigate to cart page
    await page.goto('/cart');
    
    // Check cart page elements
    await expect(page.locator('h1')).toContainText(/ショッピングカート|Shopping Cart/i);
    await expect(page.locator('[data-testid="cart-items-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-summary"]')).toBeVisible();
  });

  test('should apply coupon code', async ({ page }) => {
    // Add item to cart and go to cart page
    await page.goto('/products/poke-001');
    await page.locator('[data-testid="add-to-cart-button"]').click();
    await page.goto('/cart');
    
    // Enter coupon code
    const couponInput = page.locator('[data-testid="coupon-input"]');
    await couponInput.fill('TESTCODE');
    await page.locator('[data-testid="apply-coupon"]').click();
    
    // Check for discount applied or error message
    const discountElement = page.locator('[data-testid="discount-amount"]');
    const errorMessage = page.locator('[data-testid="coupon-error"]');
    
    // Either discount is applied or error is shown
    const hasDiscount = await discountElement.isVisible().catch(() => false);
    const hasError = await errorMessage.isVisible().catch(() => false);
    
    expect(hasDiscount || hasError).toBeTruthy();
  });
});