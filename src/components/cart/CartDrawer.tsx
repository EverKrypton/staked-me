'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/utils/format'
import { Button } from '@/components/ui/button'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPriceUSD,
  } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPriceUSD()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeCart])

  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-50 bg-void/80 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md glass-dark border-l border-graphite shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-graphite">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-plasma/20 to-neon/20 flex items-center justify-center border border-plasma/20">
                <ShoppingBag className="w-5 h-5 text-plasma" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-snow">Your Cart</h2>
                <p className="text-xs text-mist">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2.5 rounded-xl hover:bg-slate/50 transition-colors group"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-mist group-hover:text-snow transition-colors" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 rounded-2xl bg-slate/30 flex items-center justify-center mb-6">
                  <ShoppingBag className="w-10 h-10 text-mist" />
                </div>
                <h3 className="text-lg font-medium text-snow mb-2">Your cart is empty</h3>
                <p className="text-sm text-mist mb-6 max-w-[200px]">
                  Add some staking products to start earning yield
                </p>
                <Link href="/products" onClick={closeCart}>
                  <Button variant="secondary">Browse Products</Button>
                </Link>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.product.id}
                  className="relative glass-card p-4 hover-lift"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-snow text-sm sm:text-base truncate pr-8">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-mist mt-0.5">{item.product.protocol}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-plasma text-sm font-semibold">{item.product.apy}% APY</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-slate/50 hover:bg-slate flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-mist" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-snow">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.maxQuantity}
                            className="w-7 h-7 rounded-lg bg-slate/50 hover:bg-slate flex items-center justify-center transition-colors disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-mist" />
                          </button>
                        </div>

                        <p className="font-semibold text-snow">{formatCurrency(item.product.priceUSD * item.quantity)}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-mist group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-graphite p-4 sm:p-6 space-y-4 bg-carbon/50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-mist">Subtotal</span>
                  <span className="text-snow font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-mist">Network Fee</span>
                  <span className="text-snow font-medium">~$2.00</span>
                </div>
                <div className="h-px bg-graphite my-3"></div>
                <div className="flex justify-between">
                  <span className="text-snow font-medium">Total</span>
                  <span className="text-xl font-bold gradient-text">{formatCurrency(totalPrice + 2)}</span>
                </div>
              </div>
              
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button className="w-full" size="lg">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link href="/products" onClick={closeCart} className="block">
                <Button variant="secondary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}
