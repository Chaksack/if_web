<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-red-50 to-rose-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Emergency Fund Savings
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Build your financial safety net with our emergency fund savings account. Access your money instantly when unexpected expenses arise while earning competitive interest.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=emergency" class="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-semibold">
                Start Emergency Fund
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Calculate Fund Size
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Shield class="w-32 h-32 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Emergency Fund -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Why You Need an Emergency Fund</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-6 bg-red-50 rounded-lg">
            <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Medical Emergencies</h3>
            <p class="text-sm text-gray-600">Unexpected health issues and medical expenses</p>
          </div>
          <div class="text-center p-6 bg-orange-50 rounded-lg">
            <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Car Repairs</h3>
            <p class="text-sm text-gray-600">Sudden vehicle breakdowns and maintenance costs</p>
          </div>
          <div class="text-center p-6 bg-blue-50 rounded-lg">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Home Repairs</h3>
            <p class="text-sm text-gray-600">Urgent home maintenance and unexpected damages</p>
          </div>
          <div class="text-center p-6 bg-purple-50 rounded-lg">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Job Loss</h3>
            <p class="text-sm text-gray-600">Income protection during employment transitions</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Fund Calculator -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-8">How Much Should You Save?</h2>
        <div class="bg-white rounded-lg p-8 shadow-sm">
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="text-center p-4 bg-yellow-50 rounded-lg">
              <div class="text-3xl font-bold text-yellow-600 mb-2">3 Months</div>
              <div class="text-sm font-medium text-gray-700 mb-2">Basic Emergency Fund</div>
              <p class="text-xs text-gray-600">For those with stable employment and dual income households</p>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <div class="text-3xl font-bold text-orange-600 mb-2">6 Months</div>
              <div class="text-sm font-medium text-gray-700 mb-2">Recommended Fund</div>
              <p class="text-xs text-gray-600">Most financial experts recommend this amount for average situations</p>
            </div>
            <div class="text-center p-4 bg-red-50 rounded-lg">
              <div class="text-3xl font-bold text-red-600 mb-2">12 Months</div>
              <div class="text-sm font-medium text-gray-700 mb-2">Extended Protection</div>
              <p class="text-xs text-gray-600">For self-employed, single income, or high-risk occupations</p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="font-semibold text-center mb-4">Quick Calculation Example</h3>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div class="font-medium text-gray-700 mb-2">Monthly Expenses:</div>
                <ul class="space-y-1 text-gray-600">
                  <li>• Rent/Mortgage: GHS 2,000</li>
                  <li>• Food & Groceries: GHS 800</li>
                  <li>• Utilities: GHS 400</li>
                  <li>• Transportation: GHS 300</li>
                  <li>• Insurance: GHS 500</li>
                  <li>• Other essentials: GHS 500</li>
                </ul>
                <div class="font-semibold text-gray-900 mt-2 pt-2 border-t">
                  Total Monthly: GHS 4,500
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-700 mb-2">Recommended Emergency Fund:</div>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>3 months:</span>
                    <span class="font-medium">GHS 13,500</span>
                  </div>
                  <div class="flex justify-between text-orange-600">
                    <span>6 months:</span>
                    <span class="font-medium">GHS 27,000</span>
                  </div>
                  <div class="flex justify-between">
                    <span>12 months:</span>
                    <span class="font-medium">GHS 54,000</span>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <div class="text-xs text-green-700 font-medium">With our 3% interest:</div>
                  <div class="text-sm text-green-800">Your GHS 27,000 fund earns GHS 810 annually</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Account Features -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Emergency Fund Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="font-semibold mb-2">Instant Access</h3>
            <p class="text-gray-600">24/7 access to your funds through ATMs, online transfers, or mobile app withdrawals.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Competitive Interest</h3>
            <p class="text-gray-600">Earn 3.0% annual interest while your emergency fund grows safely over time.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="font-semibold mb-2">Smart Alerts</h3>
            <p class="text-gray-600">Get notified when your fund is depleted and receive savings tips to rebuild it.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Building Strategy -->
    <section class="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">How to Build Your Emergency Fund</h2>
        <div class="space-y-8">
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Calculate Your Target</h3>
              <p class="text-gray-600">Determine 3-6 months of essential expenses as your initial goal. Focus on needs, not wants.</p>
            </div>
          </div>
          
          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Start Small, Be Consistent</h3>
              <p class="text-gray-600">Begin with whatever you can afford - even GHS 500 per month. Consistency matters more than the amount.</p>
            </div>
          </div>

          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Automate Your Savings</h3>
              <p class="text-gray-600">Set up automatic transfers from your checking account. Treat it like a non-negotiable bill.</p>
            </div>
          </div>

          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              4
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Use Windfalls Wisely</h3>
              <p class="text-gray-600">Put tax refunds, bonuses, or unexpected income directly into your emergency fund to accelerate growth.</p>
            </div>
          </div>

          <div class="flex gap-6 items-start">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              5
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Keep It Separate</h3>
              <p class="text-gray-600">Maintain your emergency fund in a separate account to avoid the temptation of spending it on non-emergencies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-red-600 to-rose-600 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Start Building Your Safety Net Today</h2>
        <p class="text-red-100 mb-8">Don't wait for an emergency to happen. Start building your financial security today with our dedicated emergency fund savings account.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=emergency" class="inline-flex items-center gap-2 bg-white text-red-700 px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Start Emergency Fund
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-red-700 font-semibold">
            Get Financial Planning Help
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Shield, 
  ArrowRight, 
  Activity,
  Car,
  Home,
  Briefcase,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Emergency Fund Savings - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Build your financial safety net with our emergency fund savings account. Instant access to funds, 3% interest, and smart tools to help you prepare for unexpected expenses.'
    }
  ]
})
</script>