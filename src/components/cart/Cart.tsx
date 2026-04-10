'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/utils'
import { Button } from '@/components/ui/button'
import {
  CartSheet,
  CartSheetContent,
  CartSheetHeader,
  CartSheetTitle,
  CartSheetTrigger,
} from '@/components/ui/cart-sheet'
import Link from 'next/link'

export function Cart() {
  const { items, isOpen, openCart, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPriceUSD } =
    useCartStore()

  const handleQuantityChange = useCallback(
    (productId: string, newQuantity: number) => {
      updateQuantity(productId, newQuantity)
    },
    [updateQuantity]
  )

  const totalItems = getTotalItems()
  const totalPrice = getTotalPriceUSD()

  return (
    <CartSheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <CartSheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-500 text-xs flex items-center justify-center text-white font-medium">
              {totalItems}
            </span>
          )}
        </Button>
      </CartSheetTrigger>
      <CartSheetContent>
        <CartSheetHeader>
          <CartSheetTitle className="text-xl">Shopping Cart</CartSheetTitle>
        </CartSheetHeader>
        
        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-dark-600 mb-4" />
              <p className="text-dark-400">Your cart is empty</p>
              <p className="text-dark-500 text-sm mt-1">Add some staking products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-700"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{item.product.name}</h4>
                    <p className="text-sm text-dark-400">{item.product.protocol}</p>
                    <p className="text-sm text-primary-500 font-medium">{item.product.apy}% APY</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.maxQuantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(item.product.priceUSD * item.quantity)}</p>
                    <p className="text-xs text-dark-400">{item.product.price.toFixed(4)} {item.product.token}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t border-dark-700 pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-dark-400">Subtotal</span>
              <span className="text-lg font-bold text-white">{formatCurrency(totalPrice)}</span>
            </div>
            
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            
            <Link href="/products" onClick={closeCart} className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </CartSheetContent>
    </CartSheet>
  )
}
