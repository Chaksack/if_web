<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-cyan-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business Savings Account
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Grow your business reserves with our high-yield business savings account. Earn competitive interest while maintaining liquidity for opportunities and emergencies.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=business-savings" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Open Business Account
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Compare Business Plans
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Building2 class="w-32 h-32 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Types -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Perfect for All Business Types</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Small Retail</h3>
            <p class="text-sm text-gray-600">Shops, boutiques, local stores</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Professional Services</h3>
            <p class="text-sm text-gray-600">Consultants, lawyers, doctors</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Transportation</h3>
            <p class="text-sm text-gray-600">Logistics, delivery, transport</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Laptop class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Tech & Digital</h3>
            <p class="text-sm text-gray-600">Startups, agencies, freelancers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Account Tiers -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Choose Your Business Tier</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Starter Tier -->
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="text-center mb-6">
              <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Zap class="w-4 h-4" />
                Starter
              </div>
              <div class="text-3xl font-bold text-gray-900">5.0%</div>
              <div class="text-sm text-gray-600">Annual Interest</div>
            </div>
            <div class="space-y-4">
              <div>
                <div class="font-medium text-gray-900">Balance Range</div>
                <div class="text-sm text-gray-600">GHS 1,000 - 50,000</div>
              </div>
              <div>
                <div class="font-medium text-gray-900">Monthly Transactions</div>
                <div class="text-sm text-gray-600">Up to 25 free</div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">No monthly maintenance fee</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Online banking included</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Mobile app access</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Growth Tier -->
          <div class="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-200 relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>
            <div class="text-center mb-6">
              <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <TrendingUp class="w-4 h-4" />
                Growth
              </div>
              <div class="text-3xl font-bold text-gray-900">5.5%</div>
              <div class="text-sm text-gray-600">Annual Interest</div>
            </div>
            <div class="space-y-4">
              <div>
                <div class="font-medium text-gray-900">Balance Range</div>
                <div class="text-sm text-gray-600">GHS 50,000 - 500,000</div>
              </div>
              <div>
                <div class="font-medium text-gray-900">Monthly Transactions</div>
                <div class="text-sm text-gray-600">Up to 100 free</div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">All Starter benefits</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Dedicated business manager</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Priority customer support</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Monthly financial reports</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enterprise Tier -->
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="text-center mb-6">
              <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Crown class="w-4 h-4" />
                Enterprise
              </div>
              <div class="text-3xl font-bold text-gray-900">6.0%</div>
              <div class="text-sm text-gray-600">Annual Interest</div>
            </div>
            <div class="space-y-4">
              <div>
                <div class="font-medium text-gray-900">Balance Range</div>
                <div class="text-sm text-gray-600">GHS 500,000+</div>
              </div>
              <div>
                <div class="font-medium text-gray-900">Monthly Transactions</div>
                <div class="text-sm text-gray-600">Unlimited free</div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">All Growth benefits</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Relationship manager</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Custom solutions</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span class="text-sm">Treasury management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Business Banking Features</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <Shield class="w-5 h-5 text-blue-600" />
              Security & Protection
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>FDIC insured up to GHS 250,000</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Advanced fraud monitoring</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Multi-factor authentication</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Business account segregation</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Audit-ready statements</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <Zap class="w-5 h-5 text-orange-600" />
              Business Tools
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Real-time balance notifications</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Automated savings transfers</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Cash flow forecasting</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Integration with accounting software</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Tax preparation support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Grow Your Business Savings Today</h2>
        <p class="text-blue-100 mb-8">Join thousands of businesses earning competitive returns while maintaining the flexibility they need to grow and succeed.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=business-savings" class="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Open Business Account
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-700 font-semibold">
            Schedule Business Consultation
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Building2, 
  ArrowRight, 
  Store,
  Briefcase,
  Truck,
  Laptop,
  Zap,
  TrendingUp,
  Crown,
  CheckCircle2,
  Shield
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Business Savings Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Grow your business reserves with our high-yield business savings account. Earn up to 6% interest with business banking features and dedicated support.'
    }
  ]
})
</script>