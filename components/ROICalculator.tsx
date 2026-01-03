'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calculator, TrendingUp, Wallet, PiggyBank } from 'lucide-react'

const planPrices: Record<string, number> = {
  Starter: 99,
  Growth: 249,
  Pro: 449,
  Enterprise: 500,
}

const fteOptions = [0.5, 1.0, 1.5, 2.0]

export function ROICalculator() {
  const [fteSaved, setFteSaved] = useState(1.0)
  const [monthlyCostPerFTE, setMonthlyCostPerFTE] = useState(3200)
  const [mistakesSaved, setMistakesSaved] = useState(1000)
  const [selectedPlan, setSelectedPlan] = useState('Growth')

  const calculations = useMemo(() => {
    const laborSavings = fteSaved * monthlyCostPerFTE
    const totalMonthlySavings = laborSavings + mistakesSaved
    const subscriptionCost = planPrices[selectedPlan]
    const netGain = totalMonthlySavings - subscriptionCost
    const roi = subscriptionCost > 0 ? ((netGain / subscriptionCost) * 100) : 0

    return {
      monthlySavings: totalMonthlySavings,
      subscriptionCost,
      netGain,
      roi,
    }
  }, [fteSaved, monthlyCostPerFTE, mistakesSaved, selectedPlan])

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          <CardTitle>Calculate Your ROI</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            {/* FTE Saved */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                FTE time saved per month
              </label>
              <div className="flex gap-2">
                {fteOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFteSaved(option)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      fteSaved === option
                        ? 'bg-primary text-white'
                        : 'bg-card border border-border text-zinc-400 hover:text-white hover:border-zinc-500'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Cost per FTE */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Monthly cost per FTE: <span className="text-white font-bold">£{monthlyCostPerFTE.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={2800}
                max={3500}
                step={100}
                value={monthlyCostPerFTE}
                onChange={(e) => setMonthlyCostPerFTE(Number(e.target.value))}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Monthly cost per FTE"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>£2,800</span>
                <span>£3,500</span>
              </div>
            </div>

            {/* Mistakes Saved */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Monthly savings from avoided mistakes: <span className="text-white font-bold">£{mistakesSaved.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={0}
                max={4000}
                step={250}
                value={mistakesSaved}
                onChange={(e) => setMistakesSaved(Number(e.target.value))}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Monthly savings from avoided mistakes"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>£0</span>
                <span>£4,000</span>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Selected plan
              </label>
              <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="Starter">Starter</TabsTrigger>
                  <TabsTrigger value="Growth">Growth</TabsTrigger>
                  <TabsTrigger value="Pro">Pro</TabsTrigger>
                  <TabsTrigger value="Enterprise">Enterprise</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results */}
          <div className="bg-base/50 rounded-xl p-6 border border-border">
            <h4 className="text-lg font-semibold text-white mb-6">Your Estimated Returns</h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-accent-green" />
                  </div>
                  <span className="text-sm text-zinc-400">Monthly Savings</span>
                </div>
                <span className="text-xl font-bold text-accent-green">
                  £{calculations.monthlySavings.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-accent-orange" />
                  </div>
                  <span className="text-sm text-zinc-400">Subscription Cost</span>
                </div>
                <span className="text-xl font-bold text-zinc-300">
                  £{calculations.subscriptionCost}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-zinc-400">Net Monthly Gain</span>
                </div>
                <span className={`text-xl font-bold ${calculations.netGain >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                  £{calculations.netGain.toLocaleString()}
                </span>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-zinc-400 mb-2">Return on Investment</div>
                  <div className={`text-4xl font-bold ${calculations.roi >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                    {calculations.roi.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
