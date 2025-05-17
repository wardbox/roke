import { useAuth } from 'wasp/client/auth'
import { useAction } from 'wasp/client/operations'
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from 'wasp/client/operations'
import { Button } from '../client/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '../client/components/ui/card'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'
import { useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import { useToast } from '../hooks/use-toast'

const PLAN_NAME = 'Standard Plan'
const PLAN_PRICE = 499 // Price in cents ($4.99)
const PLAN_FEATURES = ['feature 1', 'feature 2', 'feature 3']

function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2)
}

export default function SubscriptionPage() {
  const { data: user } = useAuth()
  const { toast } = useToast()
  const createCheckoutSessionFn = useAction(createCheckoutSession)
  const createCustomerPortalSessionFn = useAction(createCustomerPortalSession)

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [isPortalLoading, setIsPortalLoading] = useState(false)

  const isLoading = isCheckoutLoading || isPortalLoading

  const handleManageSubscription = async () => {
    if (!user) return

    setIsPortalLoading(true)
    try {
      const result = await createCustomerPortalSessionFn({})
      if ((result as { sessionUrl: string })?.sessionUrl) {
        window.location.href = (result as { sessionUrl: string }).sessionUrl
      } else {
        toast({
          title: 'Error',
          description: 'Could not get customer portal URL.',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Could not create portal session.',
      })
    } finally {
      setIsPortalLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'User not logged in, redirecting to login...',
      })
      window.location.href = '/login?redirect=/subscribe'
      return
    }

    if (user.subscriptionStatus === 'active') {
      handleManageSubscription()
      return
    }

    setIsCheckoutLoading(true)
    try {
      const result = await createCheckoutSessionFn({})
      if ((result as { sessionUrl: string })?.sessionUrl) {
        window.location.href = (result as { sessionUrl: string }).sessionUrl
      } else {
        toast({
          title: 'Error',
          description: 'Stripe Checkout Session URL not received.',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Could not create checkout session.',
      })
    } finally {
      setIsCheckoutLoading(false)
    }
  }

  const getButtonText = () => {
    if (!user) return 'Login to Subscribe'
    const isActive = user.subscriptionStatus === 'active'

    if (isActive) return 'Manage Subscription'
    if (user.subscriptionStatus === 'incomplete') return 'Complete Payment'
    return `Subscribe ($${formatPrice(PLAN_PRICE)}/month)`
  }

  const isSubscribed = user?.subscriptionStatus === 'active'

  return (
    <div className='flex w-full flex-col'>
      <div className='mx-auto w-full max-w-md'>
        <Card className={cn(isSubscribed ? 'border-2 border-primary' : '')}>
          <CardHeader>
            <CardTitle className='font-light'>{PLAN_NAME}</CardTitle>
            <CardDescription>Access all features.</CardDescription>{' '}
          </CardHeader>
          <CardContent className='space-y-6'>
            <p className='text-3xl font-light'>
              ${formatPrice(PLAN_PRICE)}
              <span className='text-sm font-normal text-muted-foreground'>
                /month
              </span>
            </p>
            <ul className='space-y-2 pt-4'>
              {PLAN_FEATURES.map((feature, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <CheckIcon className='h-4 w-4 text-green-500' />
                  <span className='text-sm font-light text-muted-foreground'>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              onClick={
                isSubscribed ? handleManageSubscription : handleSubscribe
              }
              disabled={isLoading}
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {getButtonText()}
            </Button>
          </CardFooter>
        </Card>

        {user && (
          <p className='mt-4 text-center text-sm text-muted-foreground'>
            Current status:{' '}
            <span className='font-medium'>
              {user.subscriptionStatus
                ? user.subscriptionStatus.charAt(0).toUpperCase() +
                  user.subscriptionStatus.slice(1)
                : 'Not Subscribed'}
            </span>
            {user.subscriptionStatus === 'canceled' &&
              ' (Expires end of period)'}
          </p>
        )}
      </div>
    </div>
  )
}
