'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '£99',
    period: '/mo',
    description: 'Perfect for small workshops',
    users: 'Up to 5 users',
    features: [
      'Production scheduling',
      'Basic inventory tracking',
      'Project management',
      'Email support',
      '5GB file storage',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '£249',
    period: '/mo',
    description: 'For growing joinery businesses',
    users: 'Up to 15 users',
    features: [
      'Everything in Starter',
      'Advanced Gantt scheduling',
      'Profitability tracking',
      'Team capacity planning',
      'Priority support',
      '25GB file storage',
    ],
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Sweet Spot',
  },
  {
    name: 'Pro',
    price: '£449',
    period: '/mo',
    description: 'For established workshops',
    users: 'Up to 30 users',
    features: [
      'Everything in Growth',
      'Multi-site support',
      'Advanced reporting',
      'API access',
      'Dedicated support',
      '100GB file storage',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large operations',
    users: 'Unlimited users',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'On-premise option',
      'SLA guarantee',
      'Dedicated account manager',
      'Unlimited storage',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.popular
                ? 'border-primary shadow-lg shadow-primary/20'
                : 'hover:border-zinc-600'
            } transition-all duration-300 hover:-translate-y-1`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="success">{plan.badge}</Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>
              <p className="text-sm text-zinc-400 pt-2">{plan.users}</p>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Link href="/register" className="w-full">
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'secondary'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-zinc-500">
          Beta pricing for early customers. Prices may increase for new customers.
        </p>
        <p className="text-sm text-zinc-400">
          Optional onboarding from <span className="text-white font-medium">£299</span> (2h online training for up to 2 people).
        </p>
      </div>
    </div>
  )
}
