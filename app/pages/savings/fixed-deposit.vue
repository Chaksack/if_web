<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-green-50 to-emerald-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fixed Deposit Account
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Secure your financial future with guaranteed returns. Lock in high interest rates for terms ranging from 3 months to 5 years.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=fixed-deposit" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Open Fixed Deposit
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Calculate Returns
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Landmark class="w-32 h-32 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interest Rates Table -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Current Interest Rates</h2>
        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-lg shadow-sm border">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left font-semibold">Term</th>
                <th class="px-6 py-4 text-left font-semibold">Minimum Deposit</th>
                <th class="px-6 py-4 text-left font-semibold">Interest Rate (p.a.)</th>
                <th class="px-6 py-4 text-left font-semibold">Interest Payment</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4">3 Months</td>
                <td class="px-6 py-4">GHS 1,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">4.5%</td>
                <td class="px-6 py-4">At maturity</td>
              </tr>
              <tr>
                <td class="px-6 py-4">6 Months</td>
                <td class="px-6 py-4">GHS 1,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">5.5%</td>
                <td class="px-6 py-4">At maturity</td>
              </tr>
              <tr>
                <td class="px-6 py-4">12 Months</td>
                <td class="px-6 py-4">GHS 1,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">6.5%</td>
                <td class="px-6 py-4">Monthly or at maturity</td>
              </tr>
              <tr>
                <td class="px-6 py-4">24 Months</td>
                <td class="px-6 py-4">GHS 5,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">7.5%</td>
                <td class="px-6 py-4">Monthly or at maturity</td>
              </tr>
              <tr>
                <td class="px-6 py-4">36 Months</td>
                <td class="px-6 py-4">GHS 10,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">8.0%</td>
                <td class="px-6 py-4">Monthly or quarterly</td>
              </tr>
              <tr>
                <td class="px-6 py-4">60 Months</td>
                <td class="px-6 py-4">GHS 25,000</td>
                <td class="px-6 py-4 font-semibold text-green-600">8.5%</td>
                <td class="px-6 py-4">Monthly or quarterly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Why Choose Fixed Deposits?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="font-semibold text-center mb-2">Guaranteed Returns</h3>
            <p class="text-gray-600 text-center">Fixed interest rates ensure predictable returns regardless of market fluctuations.</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="font-semibold text-center mb-2">Capital Protection</h3>
            <p class="text-gray-600 text-center">Your principal amount is fully protected and guaranteed by FDIC insurance.</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="font-semibold text-center mb-2">Higher Interest Rates</h3>
            <p class="text-gray-600 text-center">Earn significantly more than regular savings with rates up to 8.5% per annum.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms and Conditions -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Terms & Conditions</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-green-600" />
              Benefits
            </h3>
            <ul class="space-y-2 text-sm">
              <li>• Competitive fixed interest rates</li>
              <li>• Flexible term options from 3-60 months</li>
              <li>• Choice of interest payment frequency</li>
              <li>• Auto-renewal option available</li>
              <li>• Loan against deposit facility</li>
              <li>• Premature withdrawal allowed (penalty applies)</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-lg p-6">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle class="w-5 h-5 text-red-600" />
              Important Notes
            </h3>
            <ul class="space-y-2 text-sm">
              <li>• Premature withdrawal incurs 1% penalty</li>
              <li>• Interest rates are subject to change for new deposits</li>
              <li>• Minimum tenure must be completed for full interest</li>
              <li>• Auto-renewal at prevailing rates</li>
              <li>• Documentation required for deposits above GHS 50,000</li>
              <li>• TDS applicable as per prevailing tax laws</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-700 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Secure Your Financial Future Today</h2>
        <p class="text-green-100 mb-8">Lock in attractive interest rates and watch your savings grow with guaranteed returns.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=fixed-deposit" class="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Open Fixed Deposit
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-green-700 font-semibold">
            Speak with Advisor
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Landmark, 
  ArrowRight, 
  Lock, 
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Fixed Deposit Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Secure guaranteed returns with our fixed deposit accounts. Earn up to 8.5% annual interest with flexible terms from 3 months to 5 years. FDIC insured.'
    }
  ]
})
</script>