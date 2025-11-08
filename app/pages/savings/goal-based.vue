<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-amber-50 to-orange-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Goal-Based Savings Account
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Turn your dreams into achievable goals. Our goal-based savings helps you save systematically for specific objectives with higher interest rates and automated planning.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=goal-based" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Start Goal Planning
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Calculate Timeline
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Target class="w-32 h-32 text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Goals -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Popular Savings Goals</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Dream Vacation</h3>
            <p class="text-sm text-gray-600 mb-3">Save for that perfect getaway</p>
            <div class="text-xs text-blue-700 font-medium">Avg: GHS 15,000</div>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">New Car</h3>
            <p class="text-sm text-gray-600 mb-3">Drive your dream vehicle</p>
            <div class="text-xs text-green-700 font-medium">Avg: GHS 80,000</div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Home Down Payment</h3>
            <p class="text-sm text-gray-600 mb-3">Own your perfect home</p>
            <div class="text-xs text-purple-700 font-medium">Avg: GHS 250,000</div>
          </div>

          <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Education Fund</h3>
            <p class="text-sm text-gray-600 mb-3">Invest in your future</p>
            <div class="text-xs text-orange-700 font-medium">Avg: GHS 120,000</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">How Goal-Based Savings Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">1. Set Your Goal</h3>
            <p class="text-gray-600">Define what you're saving for, how much you need, and when you want to achieve it.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">2. Create Your Plan</h3>
            <p class="text-gray-600">Our system calculates how much to save monthly to reach your goal on time.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">3. Watch It Grow</h3>
            <p class="text-gray-600">Automate your savings and earn 4% interest while tracking your progress.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features & Benefits -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Features & Benefits</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-amber-50 rounded-lg p-6">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-amber-600" />
              Smart Features
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>4.0% annual interest rate</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Automated monthly transfers</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Goal progress tracking</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Milestone notifications</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Flexible contribution adjustments</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Multiple goals support</span>
              </li>
            </ul>
          </div>

          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <Star class="w-5 h-5 text-blue-600" />
              Special Benefits
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Achievement bonus rewards</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Early goal completion rewards</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Free financial planning consultation</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Goal-specific investment options</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Partner discounts and offers</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Emergency pause option</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Savings Calculator Preview -->
    <section class="bg-gradient-to-br from-amber-100 to-orange-100 py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-8">Quick Goal Calculator</h2>
        <div class="bg-white rounded-lg p-8 shadow-sm">
          <div class="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Goal Amount (GHS)</label>
              <div class="text-2xl font-bold text-gray-900">50,000</div>
              <div class="text-sm text-gray-500">Example: New Car</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
              <div class="text-2xl font-bold text-gray-900">3 years</div>
              <div class="text-sm text-gray-500">36 months</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Savings Needed</label>
              <div class="text-2xl font-bold text-amber-600">GHS 1,250</div>
              <div class="text-sm text-gray-500">+ 4% interest earned</div>
            </div>
          </div>
          <div class="text-center">
            <Button size="lg" class="bg-amber-600 hover:bg-amber-700">
              Create Your Custom Plan
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Turn Your Dreams Into Reality</h2>
        <p class="text-amber-100 mb-8">Start your goal-based savings journey today and make your dreams achievable with our smart planning tools and competitive interest rates.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=goal-based" class="inline-flex items-center gap-2 bg-white text-amber-700 px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Start Goal Planning
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-amber-700 font-semibold">
            Speak with Advisor
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Target, 
  ArrowRight, 
  Plane,
  Car,
  Home,
  GraduationCap,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Dot,
  Star
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Goal-Based Savings Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Achieve your dreams with our goal-based savings account. Earn 4% interest while saving systematically for your vacation, car, home, or education goals.'
    }
  ]
})
</script>