<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-purple-50 to-pink-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Children's Savings Account
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Give your child a head start in life with our children's savings account. Earn competitive interest while teaching valuable financial lessons.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=children" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Open Children's Account
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Download Resources
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Baby class="w-32 h-32 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Why Start Early?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="font-semibold mb-2">Competitive Interest</h3>
            <p class="text-gray-600">Earn 3.5% annual interest, helping your child's savings grow faster over time.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="font-semibold mb-2">Financial Education</h3>
            <p class="text-gray-600">Free educational resources and tools to teach your child about money management.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="font-semibold mb-2">Special Benefits</h3>
            <p class="text-gray-600">Birthday bonuses, milestone rewards, and special savings challenges for kids.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Age-Based Benefits -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Benefits by Age Group</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby class="w-10 h-10 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold">Ages 0-5</h3>
              <p class="text-sm text-gray-600">Early Start Program</p>
            </div>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Parent/guardian managed account</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Monthly birthday savings bonuses</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Milestone celebration rewards</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-blue-600" />
                <span>Digital piggy bank tracker</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User class="w-10 h-10 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold">Ages 6-12</h3>
              <p class="text-sm text-gray-600">Learning Program</p>
            </div>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Supervised account access</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Interactive financial games</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Savings goal tracking</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Educational workshops</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap class="w-10 h-10 text-orange-600" />
              </div>
              <h3 class="text-xl font-semibold">Ages 13-17</h3>
              <p class="text-sm text-gray-600">Teen Independence</p>
            </div>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Teen debit card access</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Mobile banking app</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>College savings planning</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckCircle2 class="w-4 h-4 text-orange-600" />
                <span>Financial literacy courses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Account Features -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Account Features</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-purple-600" />
              Account Benefits
            </h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>3.5% annual interest rate</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>No minimum balance required</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>No monthly maintenance fees</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Free educational resources</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Parent/child joint access</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Birthday and milestone bonuses</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle class="w-5 h-5 text-orange-600" />
              Requirements
            </h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Child must be under 18 years</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Parent/guardian as joint holder</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Birth certificate required</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Parent ID and proof of address</span>
              </li>
              <li class="flex items-center gap-3">
                <Dot class="w-4 h-4 text-gray-400" />
                <span>Initial deposit (any amount)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Start Building Your Child's Future Today</h2>
        <p class="text-purple-100 mb-8">Open a children's savings account and give your child the gift of financial literacy and security.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=children" class="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Open Account Now
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-purple-700 font-semibold">
            Schedule a Consultation
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Baby, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Gift,
  CheckCircle2,
  Dot,
  AlertCircle,
  User,
  GraduationCap
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Children\'s Savings Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Start building your child\'s financial future with our children\'s savings account. Earn 3.5% interest with educational resources and special benefits for kids.'
    }
  ]
})
</script>