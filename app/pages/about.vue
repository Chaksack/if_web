<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Innovative Finance
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Building financial futures since 2018, we're Ghana's leading digital-first bank committed to innovation, accessibility, and exceptional customer service.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" class="flex items-center gap-2">
              Join Our Team
              <Users class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Our Locations
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-2xl font-bold mb-4">Our Mission</h2>
            <p class="text-gray-600">
              To democratize financial services by providing innovative, accessible, and transparent banking solutions that empower individuals and businesses to achieve their financial goals.
            </p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-2xl font-bold mb-4">Our Vision</h2>
            <p class="text-gray-600">
              To be West Africa's most trusted and innovative financial institution, leading the digital transformation of banking while maintaining the human touch that builds lasting relationships.
            </p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-2xl font-bold mb-4">Our Values</h2>
            <p class="text-gray-600">
              Integrity, Innovation, Inclusivity, and Impact. We believe in doing right by our customers, embracing change, serving everyone, and making a positive difference in communities.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Our Story</h2>
        <div class="space-y-8">
          <div class="flex gap-6">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2018
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Founded with a Vision</h3>
              <p class="text-gray-600">
                Innovative Finance was established in Accra with a mission to transform traditional banking through technology. Our founders, seasoned financial professionals, recognized the need for more accessible and user-friendly banking services in Ghana.
              </p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2019
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Digital Platform Launch</h3>
              <p class="text-gray-600">
                We launched our comprehensive digital banking platform, featuring mobile banking, online account opening, and 24/7 customer support. This made us one of Ghana's first fully digital-enabled banks.
              </p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2021
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Expanding Access</h3>
              <p class="text-gray-600">
                We expanded our services to include microfinance, agricultural lending, and small business support programs, reaching underserved communities across Ghana and making financial inclusion our priority.
              </p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2023
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Innovation Recognition</h3>
              <p class="text-gray-600">
                Awarded "Most Innovative Bank in West Africa" and reached 500,000+ customers. We introduced AI-powered financial advisory services and launched our sustainability-focused green banking initiatives.
              </p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2025
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Leading the Future</h3>
              <p class="text-gray-600">
                Today, we serve over 1 million customers across Ghana and have expanded to Nigeria and Ivory Coast. We continue to innovate with blockchain technology, advanced analytics, and personalized financial solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Our Impact in Numbers</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">1M+</div>
            <div class="text-gray-600">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">GHS 2.5B</div>
            <div class="text-gray-600">Total Deposits</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
            <div class="text-gray-600">Loans Disbursed</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-orange-600 mb-2">3</div>
            <div class="text-gray-600">Countries Served</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Leadership Team</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-6 text-center shadow-sm">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-12 h-12 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Kwame Asante</h3>
            <div class="text-blue-600 font-medium mb-2">Chief Executive Officer</div>
            <p class="text-sm text-gray-600">
              Former Goldman Sachs executive with 15 years in international banking. Led digital transformation initiatives across emerging markets.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 text-center shadow-sm">
            <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-12 h-12 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Ama Osei</h3>
            <div class="text-green-600 font-medium mb-2">Chief Technology Officer</div>
            <p class="text-sm text-gray-600">
              Former Microsoft and Spotify engineer specializing in fintech solutions. PhD in Computer Science from MIT, expert in AI and blockchain.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 text-center shadow-sm">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-12 h-12 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2">David Mensah</h3>
            <div class="text-purple-600 font-medium mb-2">Chief Financial Officer</div>
            <p class="text-sm text-gray-600">
              Chartered accountant with extensive experience in West African markets. Previously CFO at Standard Chartered Ghana.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Awards and Recognition -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award class="w-8 h-8 text-yellow-600" />
            </div>
            <div class="font-semibold text-sm">Best Digital Bank 2024</div>
            <div class="text-xs text-gray-600">African Banking Awards</div>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy class="w-8 h-8 text-blue-600" />
            </div>
            <div class="font-semibold text-sm">Innovation Leader 2023</div>
            <div class="text-xs text-gray-600">Ghana Banking Excellence</div>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star class="w-8 h-8 text-green-600" />
            </div>
            <div class="font-semibold text-sm">Customer Choice 2024</div>
            <div class="text-xs text-gray-600">Ghana Customer Satisfaction</div>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8 text-purple-600" />
            </div>
            <div class="font-semibold text-sm">Security Excellence 2024</div>
            <div class="text-xs text-gray-600">Cybersecurity Alliance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Impact -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Our Commitment to Community</h2>
        <p class="text-blue-100 mb-8 text-lg">
          Beyond banking, we're dedicated to building stronger communities through education, environmental sustainability, and economic empowerment programs.
        </p>
        <div class="grid md:grid-cols-3 gap-8 text-white">
          <div>
            <div class="text-3xl font-bold mb-2">10,000+</div>
            <div class="text-blue-100">Students Sponsored</div>
          </div>
          <div>
            <div class="text-3xl font-bold mb-2">500+</div>
            <div class="text-blue-100">SMEs Supported</div>
          </div>
          <div>
            <div class="text-3xl font-bold mb-2">GHS 50M</div>
            <div class="text-blue-100">Community Investment</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Join Our Journey?</h2>
        <p class="text-gray-600 mb-8">
          Whether you're looking for personal banking, business solutions, or career opportunities, we'd love to hear from you.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" class="flex items-center gap-2">
            Open Account Today
            <ArrowRight class="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  User,
  Award,
  Trophy,
  Star,
  Shield,
  ArrowRight
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'About Innovative Finance - Leading Digital Bank in Ghana',
  meta: [
    {
      name: 'description',
      content: 'Learn about Innovative Finance, Ghana\'s leading digital-first bank. Discover our mission, values, leadership team, and commitment to transforming banking since 2018.'
    }
  ]
})
</script>