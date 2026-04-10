'use client'

import { useState, useCallback, Suspense } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAccount, useWalletClient } from 'wagmi'
import { parseUnits } from 'viem'
import { ArrowLeft, Check, Loader2, AlertTriangle, Copy, ExternalLink, Shield, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from '@/utils/validation'
import { useCartStore } from '@/store/cart'
import { useOrderStore, paymentMethods } from '@/store/order'
import { formatCurrency } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { generatePaymentReference } from '@/utils/security'
import Link from 'next/link'

const PAYMENT_WALLET_ADDRESS = '0x31B37a342C539BA4cD38C21815808B671c4456d7'

const steps = [
  { id: 'details', label: 'Details', icon: '1' },
  { id: 'payment', label: 'Payment', icon: '2' },
  { id: 'confirming', label: 'Confirm', icon: '3' },
]

function CheckoutContent() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  
  const { items, getTotalPriceUSD, clearCart } = useCartStore()
  const { createOrder, updateOrderStatus, setTransactionHash, isProcessing, setProcessing } = useOrderStore()
  
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'confirming' | 'success'>('details')
  const [paymentReference] = useState(generatePaymentReference())
  const [copiedAddress, setCopiedAddress] = useState(false)
  
  const {
    register,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      walletAddress: address || '',
      paymentMethod: '',
    },
  })
  
  const totalPriceUSD = getTotalPriceUSD()
  const selectedPaymentMethod = paymentMethods.find((m) => m.id === selectedPayment)
  
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }, [])
  
  const handleProceedToPayment = useCallback(() => {
    if (!selectedPayment) return
    setCurrentStep('payment')
  }, [selectedPayment])
  
  const handlePayment = useCallback(async () => {
    if (!walletClient || !selectedPaymentMethod || !address) return
    
    setCurrentStep('confirming')
    setProcessing(true)
    
    try {
      const orderId = createOrder({
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        total: totalPriceUSD,
        totalUSD: totalPriceUSD,
        status: 'pending',
        paymentMethod: selectedPaymentMethod.symbol.toLowerCase() as 'usdt' | 'usdc' | 'eth' | 'matic' | 'bnb',
        paymentAddress: PAYMENT_WALLET_ADDRESS,
      })
      
      updateOrderStatus(orderId, 'processing')
      
      const amount = parseUnits(totalPriceUSD.toFixed(2), selectedPaymentMethod.decimals)
      
      let txHash: `0x${string}`
      
      if (selectedPaymentMethod.contractAddress) {
        txHash = await walletClient.writeContract({
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
        })
      } else {
        txHash = await walletClient.sendTransaction({
          to: PAYMENT_WALLET_ADDRESS as `0x${string}`,
          value: amount,
        })
      }
      
      setTransactionHash(orderId, txHash)
      updateOrderStatus(orderId, 'completed')
      clearCart()
      setCurrentStep('success')
    } catch (error) {
      console.error('Payment failed:', error)
      setCurrentStep('payment')
    } finally {
      setProcessing(false)
    }
  }, [walletClient, selectedPaymentMethod, address, items, totalPriceUSD, createOrder, updateOrderStatus, setTransactionHash, clearCart, setProcessing])
  
  if (items.length === 0 && currentStep !== 'success') {
    return (
      <div className="min-h-screen bg-void bg-grid">
        <Header />
        <CartDrawer />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate/30 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-mist" />
            </div>
            <h1 className="text-2xl font-display font-bold text-snow mb-3">Your cart is empty</h1>
            <p className="text-mist mb-6">Add some products before checkout</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-void bg-grid">
        <Header />
        <CartDrawer />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-display font-bold text-snow mb-3">Connect Wallet</h1>
            <p className="text-mist mb-6">Please connect your wallet to proceed</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-void bg-grid">
        <Header />
        <CartDrawer />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plasma to-neon flex items-center justify-center mx-auto mb-6 shadow-lg shadow-plasma/30">
                <Check className="w-10 h-10 text-void" />
              </div>
              <h1 className="text-2xl font-display font-bold text-snow mb-2">Payment Successful!</h1>
              <p className="text-mist mb-6">Your staking positions are being activated.</p>
              <p className="text-xs text-mist/60 font-mono mb-6">Ref: {paymentReference}</p>
              <Link href="/portfolio">
                <Button className="w-full">View Portfolio</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const getStepIndex = () => {
    switch (currentStep) {
      case 'details': return 0
      case 'payment': return 1
      case 'confirming': return 2
      default: return 0
    }
  }
  
  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />
      <CartDrawer />
      
      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-xl bg-slate/30 hover:bg-slate/50 border border-ash/30 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-mist" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-snow">Checkout</h1>
              <p className="text-xs sm:text-sm text-mist">Complete your purchase</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-8 sm:mb-10">
            <div className="flex items-center gap-2 sm:gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      index <= getStepIndex()
                        ? 'bg-gradient-to-br from-plasma to-neon text-void'
                        : 'bg-slate/30 text-mist border border-ash/30'
                    }`}>
                      {index < getStepIndex() ? <Check className="w-4 h-4" /> : step.icon}
                    </div>
                    <span className={`hidden sm:block text-sm font-medium ${
                      index <= getStepIndex() ? 'text-snow' : 'text-mist'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 rounded-full transition-colors ${
                      index < getStepIndex() ? 'bg-plasma' : 'bg-ash/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="lg:col-span-3 space-y-6">
              {currentStep === 'details' && (
                <>
                  <div className="glass-card p-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-snow mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-plasma" />
                      Delivery Address
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-mist mb-2">
                          Wallet Address
                        </label>
                        <input
                          type="text"
                          {...register('walletAddress')}
                          className="input-field font-mono text-sm"
                          placeholder="0x..."
                          defaultValue={address || ''}
                        />
                        {errors.walletAddress && (
                          <p className="text-red-400 text-xs mt-1">{errors.walletAddress.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-snow mb-4">Payment Method</h2>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                            selectedPayment === method.id
                              ? 'border-plasma bg-plasma/10 shadow-lg shadow-plasma/10'
                              : 'border-ash/30 hover:border-ash/50 bg-slate/20'
                          }`}
                        >
                          <Image
                            src={method.icon}
                            alt={method.name}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <span className="text-xs sm:text-sm font-medium text-snow">{method.symbol}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleProceedToPayment}
                    disabled={!selectedPayment}
                  >
                    Continue to Payment
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </>
              )}
              
              {currentStep === 'payment' && selectedPaymentMethod && (
                <div className="glass-card p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-snow mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-plasma" />
                    Send Payment
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-plasma/10 to-neon/5 border border-plasma/20">
                      <p className="text-xs text-mist uppercase tracking-wide mb-1">Amount to send</p>
                      <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                        ${totalPriceUSD.toFixed(2)}
                      </p>
                      <p className="text-sm text-mist mt-1">{selectedPaymentMethod.symbol}</p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-slate/30 border border-ash/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-mist uppercase tracking-wide">Payment Address</p>
                        <button
                          onClick={() => copyToClipboard(PAYMENT_WALLET_ADDRESS)}
                          className="flex items-center gap-1 text-plasma hover:text-neon text-xs font-medium transition-colors"
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-mono text-xs sm:text-sm text-snow break-all">
                        {PAYMENT_WALLET_ADDRESS}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-ember/10 border border-ember/30">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-ember flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-ember">Important</p>
                          <p className="text-xs text-ember/80 mt-1">
                            Only send {selectedPaymentMethod.symbol} on the correct network. Wrong network = lost funds.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentStep('details')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-1"
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
                </div>
              )}
              
              {currentStep === 'confirming' && (
                <div className="glass-card p-8 text-center">
                  <Loader2 className="w-12 h-12 text-plasma animate-spin mx-auto mb-4" />
                  <h2 className="text-xl font-display font-bold text-snow mb-2">Confirming Payment</h2>
                  <p className="text-mist">Please confirm the transaction in your wallet...</p>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <div className="glass-card p-5 sm:p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-snow mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate/50 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-snow truncate">{item.product.name}</p>
                        <p className="text-xs text-mist">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-snow">
                        {formatCurrency(item.product.priceUSD * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-graphite pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-mist">Subtotal</span>
                    <span className="text-snow">{formatCurrency(totalPriceUSD)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-mist">Network Fee</span>
                    <span className="text-snow">~$2.00</span>
                  </div>
                  <div className="h-px bg-graphite my-3"></div>
                  <div className="flex justify-between">
                    <span className="text-snow font-medium">Total</span>
                    <span className="text-xl font-bold gradient-text">{formatCurrency(totalPriceUSD + 2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CheckoutContent />
    </Suspense>
  )
}
