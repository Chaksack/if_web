<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Equipment Loans', href: '/loans/equipment' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Equipment Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Upgrade your business equipment with our flexible financing options. From machinery to technology, we help you stay competitive with modern equipment solutions.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Equipment Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">100% Financing Available</h3>
                <p class="text-gray-600">Fund up to 100% of your equipment purchase with competitive rates.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Quick Approvals</h3>
                <p class="text-gray-600">Get approved within 48 hours and receive funding quickly.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Tax Benefits</h3>
                <p class="text-gray-600">Potential tax advantages through equipment financing.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Equipment We Finance</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Cog class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Manufacturing Equipment</h3>
            <p class="text-gray-600">Industrial machinery and production line equipment.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>CNC machines</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Production lines</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Truck class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Transportation Equipment</h3>
            <p class="text-gray-600">Vehicles and logistics equipment.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Commercial vehicles</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Material handling</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <MonitorSmartphone class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Technology Equipment</h3>
            <p class="text-gray-600">IT infrastructure and software systems.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Computer systems</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Software licenses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Financing Options</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <DollarSign class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-4">Equipment Loans</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Fixed monthly payments</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Terms up to 7 years</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Equipment serves as collateral</span>
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <RefreshCcw class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-4">Equipment Leasing</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Lower monthly payments</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Option to upgrade equipment</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-primary mt-1" />
                <span>Potential tax advantages</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 class="text-3xl font-semibold mb-6">Application Process</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">1. Apply Online</h3>
            <p class="text-sm text-gray-600">Complete our simple online application</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSearch class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">2. Documentation</h3>
            <p class="text-sm text-gray-600">Submit required business documents</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">3. Approval</h3>
            <p class="text-sm text-gray-600">Quick decision within 48 hours</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">4. Equipment</h3>
            <p class="text-sm text-gray-600">Purchase and deploy your equipment</p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <Button size="lg" class="w-full md:w-auto">Apply for Equipment Financing</Button>
      </div>
    </div>

    <FAQs />
  </div>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import Calculator from '~/components/loans/Calculator.vue'
import FAQs from '~/components/loans/FAQs.vue'
import Breadcrumb from '~/components/ui/breadcrumb/Breadcrumb.vue'
import { 
  CheckCircle2, 
  CircleDot, 
  Cog,
  Truck, 
  MonitorSmartphone,
  DollarSign,
  RefreshCcw,
  FileText,
  FileSearch,
  CheckSquare
} from 'lucide-vue-next'
</script>