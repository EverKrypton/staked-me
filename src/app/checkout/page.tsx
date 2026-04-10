'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAccount, useWalletClient } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { ArrowLeft, Check, Loader2, AlertCircle, Copy, ExternalLink } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from '@/utils/validation'
import { useCartStore } from '@/store/cart'
import { useOrderStore, paymentMethods } from '@/store/order'
import { formatCurrency, formatAddress } from '@/utils'
import { Button } from '@/components/ui/button'
import { generatePaymentReference } from '@/utils/security'
import Link from 'next/link'

const PAYMENT_WALLET_ADDRESS = '0x31B37a342C539BA4cD38C21815808B671c4456d7'

export default function CheckoutPage() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  
  const { items, getTotalPrice, getTotalPriceUSD, clearCart } = useCartStore()
  const { createOrder, updateOrderStatus, setTransactionHash, isProcessing, setProcessing } = useOrderStore()
  
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [step, setStep] = useState<'details' | 'payment' | 'confirming' | 'success'>('details')
  const [paymentReference] = useState(generatePaymentReference())
  const [copiedAddress, setCopiedAddress] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      walletAddress: address || '',
      paymentMethod: '',
    },
  })
  
  const watchWalletAddress = watch('walletAddress')
  
  const totalPrice = getTotalPrice()
  const totalPriceUSD = getTotalPriceUSD()
  
  const selectedPaymentMethod = paymentMethods.find((m) => m.id === selectedPayment)
  
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }, [])
  
  const handleProceedToPayment = useCallback(() => {
    if (!selectedPayment) return
    setStep('payment')
  }, [selectedPayment])
  
  const handlePayment = useCallback(async () => {
    if (!walletClient || !selectedPaymentMethod || !address) return
    
    setStep('confirming')
    setProcessing(true)
    
    try {
      const orderId = createOrder({
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        total: totalPrice,
        totalUSD: totalPriceUSD,
        status: 'pending',
        paymentMethod: selectedPaymentMethod.symbol.toLowerCase() as 'usdt' | 'usdc' | 'eth' | 'matic' | 'bnb',
        paymentAddress: PAYMENT_WALLET_ADDRESS,
      })
      
      updateOrderStatus(orderId, 'processing')
      
      const amount = parseUnits(totalPriceUSD.toString(), selectedPaymentMethod.decimals)
      
      let txHash: `0x${string}`
      
      if (selectedPaymentMethod.contractAddress) {
        const transferData = {
          address: selectedPaymentMethod.contractAddress as `0x${string}`,
          abi: [
            {
              name: 'transfer',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [
                { name: 'to', type: 'address' },
                { name: 'amount', type: 'uint256' },
              ],
              outputs: [{ type: 'bool' }],
            },
          ],
          functionName: 'transfer',
          args: [PAYMENT_WALLET_ADDRESS as `0x${string}`, amount],
        }
        
        txHash = await walletClient.writeContract(transferData)
      } else {
        txHash = await walletClient.sendTransaction({
          to: PAYMENT_WALLET_ADDRESS as `0x${string}`,
          value: amount,
        })
      }
      
      setTransactionHash(orderId, txHash)
      updateOrderStatus(orderId, 'completed')
      clearCart()
      setStep('success')
    } catch (error) {
      console.error('Payment failed:', error)
      setStep('payment')
    } finally {
      setProcessing(false)
    }
  }, [walletClient, selectedPaymentMethod, address, items, totalPrice, totalPriceUSD, createOrder, updateOrderStatus, setTransactionHash, clearCart, setProcessing])
  
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-dark-950 pt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-dark-400 mb-6">Add some products before checkout</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-dark-950 pt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Connect Wallet</h1>
          <p className="text-dark-400 mb-6">Please connect your wallet to proceed with checkout</p>
        </div>
      </div>
    )
  }
  
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-dark-950 pt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="glass-card p-8">
            <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-dark-400 mb-6">Thank you for your purchase. Your staking positions will be activated shortly.</p>
            <p className="text-sm text-dark-500 mb-6">Reference: {paymentReference}</p>
            <Link href="/portfolio">
              <Button>View Portfolio</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold text-white">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 'details' && (
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Delivery Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      {...register('walletAddress')}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                      placeholder="0x..."
                    />
                    {errors.walletAddress && (
                      <p className="text-red-400 text-sm mt-1">{errors.walletAddress.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Payment Method</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 ${
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-dark-700 hover:border-dark-600 bg-dark-800/30'
                    }`}
                  >
                    <Image
                      src={method.icon}
                      alt={method.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-white">{method.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {step === 'payment' && selectedPaymentMethod && (
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Send Payment</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-dark-800/50 rounded-xl">
                    <p className="text-sm text-dark-400 mb-1">Amount to send</p>
                    <p className="text-2xl font-display font-bold text-white">
                      ${totalPriceUSD.toFixed(2)} {selectedPaymentMethod.symbol}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-dark-800/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-dark-400">Payment Address</p>
                      <button
                        onClick={() => copyToClipboard(PAYMENT_WALLET_ADDRESS)}
                        className="text-primary-500 hover:text-primary-400 flex items-center gap-1 text-sm"
                      >
                        {copiedAddress ? 'Copied!' : 'Copy'}
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-mono text-sm text-white break-all">
                      {PAYMENT_WALLET_ADDRESS}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-accent-orange/10 border border-accent-orange/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-accent-orange">Important</p>
                        <p className="text-xs text-accent-orange/80 mt-1">
                          Only send {selectedPaymentMethod.symbol} on {selectedPaymentMethod.chainId === 1 ? 'Ethereum' : selectedPaymentMethod.chainId === 56 ? 'BNB Chain' : 'Polygon'} network. Sending other tokens or using different networks may result in loss of funds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(totalPriceUSD)}`
                  )}
                </Button>
              </div>
            )}
            
            {step === 'details' && (
              <Button
                className="w-full"
                size="lg"
                onClick={handleProceedToPayment}
                disabled={!selectedPayment}
              >
                Continue to Payment
              </Button>
            )}
          </div>
          
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-dark-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(item.product.priceUSD * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-dark-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">Subtotal</span>
                  <span className="text-white">{formatCurrency(totalPriceUSD)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">Network Fee</span>
                  <span className="text-white">~$2.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-dark-700">
                  <span className="text-white">Total</span>
                  <span className="text-primary-500">{formatCurrency(totalPriceUSD + 2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
