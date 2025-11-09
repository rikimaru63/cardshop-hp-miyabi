'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, cn } from '@/lib/utils';

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Start adding some trading cards to your cart!</p>
                <Link 
                  href="/products"
                  onClick={closeCart}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                    {/* Product Image */}
                    <Link 
                      href={`/products/${item.product.id}`}
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={60}
                        height={80}
                        className="rounded object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.product.id}`}
                        onClick={closeCart}
                        className="block"
                      >
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.product.name}
                        </h4>
                      </Link>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        {item.product.set && (
                          <div>{item.product.set}</div>
                        )}
                        {item.product.condition && (
                          <div className="inline-block bg-gray-200 px-2 py-0.5 rounded">
                            {item.product.condition}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.product.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.product.id, item.quantity - 1);
                              } else {
                                removeItem(item.product.id);
                              }
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {item.quantity > 1 ? (
                              <Minus className="h-3 w-3" />
                            ) : (
                              <Trash2 className="h-3 w-3 text-red-500" />
                            )}
                          </button>
                          
                          <span className="min-w-[2rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => {
                              if (item.quantity < item.product.stock) {
                                updateQuantity(item.product.id, item.quantity + 1);
                              }
                            }}
                            disabled={item.quantity >= item.product.stock}
                            className={cn(
                              "p-1 rounded transition-colors",
                              item.quantity >= item.product.stock
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-200"
                            )}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Subtotal: {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-200 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium text-center block hover:bg-red-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="text-center">
                <button
                  onClick={closeCart}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}