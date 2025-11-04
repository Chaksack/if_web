<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p class="text-xl text-gray-600">Please read these terms carefully before using our services.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="prose max-w-none">
          <div id="acceptance" class="mb-12">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Innovative Finance's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </div>

          <div id="services" class="mb-12">
            <h2>2. Services Description</h2>
            <p>Innovative Finance provides financial services including but not limited to:</p>
            <ul>
              <li>Personal and business loans</li>
              <li>Credit card services</li>
              <li>Financial advisory services</li>
              <li>Online banking services</li>
            </ul>
          </div>

          <div id="obligations" class="mb-12">
            <h2>3. User Obligations</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </div>

          <div id="financial" class="mb-12">
            <h2>4. Financial Services</h2>
            <p>4.1 Loan Services</p>
            <ul>
              <li>Loan approval is subject to credit assessment</li>
              <li>Interest rates are determined based on market conditions</li>
              <li>Early repayment terms as specified in loan agreements</li>
            </ul>
            
            <p class="mt-4">4.2 Credit Cards</p>
            <ul>
              <li>Card issuance subject to eligibility</li>
              <li>Usage terms as per card member agreement</li>
              <li>Fees and charges as per current schedule</li>
            </ul>
          </div>

          <div id="privacy" class="mb-12">
            <h2>5. Privacy & Security</h2>
            <p>We are committed to protecting your privacy and maintaining the security of your personal information. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your data.</p>
          </div>

          <div id="modifications" class="mb-12">
            <h2>6. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.</p>
          </div>

          <div id="termination" class="mb-12">
            <h2>7. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our services, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>
          </div>

          <div id="contact" class="mb-12">
            <h2>8. Contact Information</h2>
            <p>For questions about these Terms & Conditions, please contact us at:</p>
            <ul>
              <li>Email: legal@innovativefinance.com</li>
              <li>Phone: +233 XX XXX XXXX</li>
              <li>Address: 123 Financial District, Accra, Ghana</li>
            </ul>
          </div>

          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">Last updated: November 4, 2025</p>
          </div>

          <!-- Quick Navigation -->
          <div class="fixed top-[200px] right-8 w-64 hidden xl:block">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
              <h4 class="font-semibold text-sm mb-3">On this page</h4>
              <nav class="space-y-2">
                <a v-for="section in sections" 
                   :key="section.id"
                   :href="'#' + section.id"
                   :class="[
                     'block text-sm py-1 px-2 rounded transition-colors',
                     activeSection === section.id 
                       ? 'bg-primary/10 text-primary' 
                       : 'text-gray-600 hover:bg-gray-50'
                   ]"
                >
                  {{ section.title }}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Feedback Section -->
        <div class="mt-12 border-t pt-8">
          <div class="text-center">
            <h3 class="text-lg font-semibold mb-4">Was this helpful?</h3>
            <div class="space-x-4">
              <Button 
                variant="outline" 
                @click="submitFeedback(true)"
                :disabled="feedbackSubmitted"
              >
                <ThumbsUp class="w-4 h-4 mr-2" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                @click="submitFeedback(false)"
                :disabled="feedbackSubmitted"
              >
                <ThumbsDown class="w-4 h-4 mr-2" />
                No
              </Button>
            </div>
            <p v-if="feedbackSubmitted" class="text-sm text-gray-600 mt-4">
              Thank you for your feedback!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '~/components/ui/button'
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next'

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services Description' },
  { id: 'obligations', title: '3. User Obligations' },
  { id: 'financial', title: '4. Financial Services' },
  { id: 'privacy', title: '5. Privacy & Security' },
  { id: 'modifications', title: '6. Modifications' },
  { id: 'termination', title: '7. Termination' },
  { id: 'contact', title: '8. Contact Information' }
]

const activeSection = ref<string>(sections[0]?.id || 'acceptance')
const feedbackSubmitted = ref<boolean>(false)

// Intersection Observer for section highlighting
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 }
  )

  sections.forEach(({ id }) => {
    const element = document.getElementById(id)
    if (element && observer) observer.observe(element)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function submitFeedback(isHelpful: boolean): void {
  feedbackSubmitted.value = true
  // Here you would typically send the feedback to your backend
  console.log('Feedback submitted:', isHelpful)
}
</script>