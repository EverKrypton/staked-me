'use client'

import Image from 'next/image'
import { TrendingUp, ShoppingCart, Check, Star } from 'lucide-react'
import type { Product } from '@/types'
import { formatCurrency } from '@/utils/format'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
  isInCart: boolean
  index?: number
}

export function ProductCard({ product, onAddToCart, isInCart, index = 0 }: ProductCardProps) {
  return (
    <article
      className="product-card group animate-in"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate/50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <h3 className="font-semibold text-snow text-sm sm:text-base leading-tight">{product.name}</h3>
            <p className="text-xs text-mist mt-0.5">{product.protocol}</p>
          </div>
        </div>
        
        {product.apy >= 20 && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-ember/10 border border-ember/20">
            <Star className="w-3 h-3 text-ember fill-ember" />
            <span className="text-[10px] font-semibold text-ember uppercase">Hot</span>
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-mist leading-relaxed mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="metric-badge">
          <TrendingUp className="w-4 h-4 text-plasma" />
          <div>
            <p className="text-[10px] text-mist uppercase">APY</p>
            <p className="stat-value text-base text-plasma">{product.apy}%</p>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-slate/20 border border-ash/20">
          <p className="text-[10px] text-mist uppercase">TVL</p>
          <p className="stat-value text-base text-snow">{formatCurrency(product.tvl)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-graphite">
        <div>
          <p className="stat-value text-xl text-snow">{formatCurrency(product.priceUSD)}</p>
          <p className="text-[10px] text-mist mt-0.5">
            {product.price.toFixed(6)} {product.token}
          </p>
        </div>
        
        <Button
          onClick={onAddToCart}
          disabled={isInCart}
          variant={isInCart ? 'secondary' : 'default'}
          size="sm"
          className="min-w-[110px]"
        >
          {isInCart ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              In Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className={`tag tag-${product.category === 'lp' ? 'lp' : product.category === 'lending' ? 'lending' : product.category === 'boost' ? 'boost' : 'staking'}`}>
          {product.category}
        </span>
        <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-slate/30 text-mist border border-ash/20">
          {product.chain}
        </span>
      </div>
    </article>
  )
}
