'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, cn } from '@/lib/utils';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setIsPromoApplied(true);
    }
  };

  const removePromoCode = () => {
    setIsPromoApplied(false);
    setPromoCode('');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link 
            href="/products"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart ({totalItems} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Clear Cart Button */}
          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All Items
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={120}
                      height={160}
                      className="rounded-lg object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Category: {item.product.category}</p>
                      {item.product.set && <p>Set: {item.product.set}</p>}
                      {item.product.condition && <p>Condition: {item.product.condition}</p>}
                      {item.product.rarity && (
                        <span className={cn(
                          "inline-block px-2 py-1 rounded-full text-xs font-medium",
                          {
                            'bg-gray-100 text-gray-600': item.product.rarity === 'Common',
                            'bg-blue-100 text-blue-600': item.product.rarity === 'Rare',
                            'bg-purple-100 text-purple-600': item.product.rarity === 'Super Rare',
                            'bg-yellow-100 text-yellow-600': item.product.rarity === 'Ultra Rare',
                            'bg-red-100 text-red-600': item.product.rarity === 'Secret Rare',
                          }
                        )}>
                          {item.product.rarity}
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-xl font-bold text-gray-900">
                          {formatPrice(item.product.price)}
                        </div>
                        {item.product.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className={cn(
                              "px-3 py-2 transition-colors",
                              item.quantity >= item.product.stock
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            )}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-3 text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        Subtotal: {formatPrice(item.product.price * item.quantity)}
                      </div>
                      {item.quantity < item.product.stock ? (
                        <div className="text-sm text-green-600">
                          {item.product.stock - item.quantity} more available
                        </div>
                      ) : (
                        <div className="text-sm text-yellow-600">
                          Maximum quantity reached
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {/* Discount */}
              {isPromoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (WELCOME10)</span>
                  <div className="flex items-center gap-2">
                    <span>-{formatPrice(discount)}</span>
                    <button
                      onClick={removePromoCode}
                      className="text-red-600 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Promo Code */}
              {!isPromoApplied && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Try: WELCOME10 for 10% off
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && subtotal < 100 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-800">
                    Add {formatPrice(100 - subtotal)} more for FREE shipping!
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-6">
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </button>

              {/* Security Notice */}
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>🔒 Secure checkout with SSL encryption</p>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Accepted Payment Methods:</div>
                <div className="flex items-center gap-2">
                  <div className="bg-white px-2 py-1 rounded border text-xs font-medium">VISA</div>
                  <div className="bg-white px-2 py-1 rounded border text-xs font-medium">MC</div>
                  <div className="bg-white px-2 py-1 rounded border text-xs font-medium">PayPal</div>
                  <div className="bg-white px-2 py-1 rounded border text-xs font-medium">Stripe</div>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="text-center pt-4">
                <Link 
                  href="/products"
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}