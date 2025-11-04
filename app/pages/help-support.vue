<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Help & Support</h1>
          <p class="text-xl text-gray-600">Find answers to common questions and get the support you need.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <!-- FAQ Sections -->
        <div class="space-y-16">
          <!-- General Questions -->
          <div>
            <h2 class="text-2xl font-semibold mb-8">General Questions</h2>
            <div class="grid gap-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I apply for a loan?</AccordionTrigger>
                  <AccordionContent>
                    To apply for a loan, visit our loans page and select the type of loan you're interested in. Fill out the application form with your details and submit the required documentation. Our team will review your application and get back to you within 24 hours.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What documents do I need to apply?</AccordionTrigger>
                  <AccordionContent>
                    Required documents typically include: Valid ID (National ID, Passport, or Driver's License), Proof of income (Pay slips or bank statements), Proof of address (Utility bill), and Tax Identification Number (TIN).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does the approval process take?</AccordionTrigger>
                  <AccordionContent>
                    Most loan applications are processed within 24 hours. Once approved, funds are typically disbursed within 1-2 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <!-- Account & Security -->
          <div>
            <h2 class="text-2xl font-semibold mb-8">Account & Security</h2>
            <div class="grid gap-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Click on the "Forgot Password" link on the login page. Enter your registered email address, and we'll send you instructions to reset your password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we use industry-standard encryption and security measures to protect your personal information. Our systems are regularly audited and comply with all relevant data protection regulations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <!-- Contact Options -->
          <div>
            <h2 class="text-2xl font-semibold mb-8">Need More Help?</h2>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="p-6 bg-gray-50 rounded-lg">
                <Phone class="w-6 h-6 text-primary mb-4" />
                <h3 class="font-semibold mb-2">Phone Support</h3>
                <p class="text-gray-600 mb-2">Available Mon-Fri, 8am-6pm</p>
                <p class="text-primary font-medium">+233 XX XXX XXXX</p>
              </div>
              
              <div class="p-6 bg-gray-50 rounded-lg">
                <Mail class="w-6 h-6 text-primary mb-4" />
                <h3 class="font-semibold mb-2">Email Support</h3>
                <p class="text-gray-600 mb-2">24/7 Response</p>
                <p class="text-primary font-medium">support@innovativefinance.com</p>
              </div>
              
              <div class="p-6 bg-gray-50 rounded-lg">
                <MessageCircle class="w-6 h-6 text-primary mb-4" />
                <h3 class="font-semibold mb-2">Live Chat</h3>
                <p class="text-gray-600 mb-2">Available 24/7</p>
                <Button variant="outline" class="mt-2" @click="startChat">Start Chat</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Search Section -->
    <div class="border-t">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <div class="text-center max-w-2xl mx-auto mb-8">
          <h2 class="text-2xl font-semibold mb-4">Search Help Articles</h2>
          <p class="text-gray-600 mb-6">Looking for something specific? Search our help articles.</p>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search help articles..."
              class="w-full pl-10"
              v-model="searchQuery"
            />
          </div>
        </div>

        <!-- Popular Topics -->
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <div 
            v-for="topic in popularTopics" 
            :key="topic.title"
            class="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
          >
            <component 
              :is="topic.icon" 
              class="w-8 h-8 text-primary mb-4"
            />
            <h3 class="font-semibold mb-2">{{ topic.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ topic.description }}</p>
            <Button variant="link" class="p-0">Learn more →</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Tutorials -->
    <div class="border-t bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <h2 class="text-2xl font-semibold mb-8">Video Tutorials</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="video in videoTutorials" 
            :key="video.title"
            class="bg-white rounded-lg overflow-hidden border"
          >
            <div class="relative aspect-video bg-gray-100">
              <Play class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary/80" />
            </div>
            <div class="p-4">
              <h3 class="font-medium mb-2">{{ video.title }}</h3>
              <p class="text-sm text-gray-600">{{ video.duration }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/components/ui/accordion'
import { 
  Phone, 
  Mail, 
  MessageCircle,
  Search,
  CreditCard,
  Wallet,
  Shield,
  Play
} from 'lucide-vue-next'

const searchQuery = ref('')

// Function to open chat - will be handled by the layout's LiveChat
const startChat = () => {
  // Dispatch a custom event that the LiveChat component can listen to
  window.dispatchEvent(new CustomEvent('open-live-chat'))
}

const popularTopics = [
  {
    title: 'Online Banking',
    description: 'Learn how to manage your accounts, make transfers, and use our online banking features.',
    icon: Wallet
  },
  {
    title: 'Card Services',
    description: 'Everything you need to know about your credit and debit cards.',
    icon: CreditCard
  },
  {
    title: 'Security Center',
    description: 'Tips and guidelines to keep your accounts and transactions secure.',
    icon: Shield
  }
]

const videoTutorials = [
  {
    title: 'Getting Started with Online Banking',
    duration: '5:30 mins',
    thumbnail: '/videos/online-banking.jpg'
  },
  {
    title: 'How to Apply for a Loan',
    duration: '4:15 mins',
    thumbnail: '/videos/loan-application.jpg'
  },
  {
    title: 'Mobile Banking App Tutorial',
    duration: '6:45 mins',
    thumbnail: '/videos/mobile-banking.jpg'
  }
]
</script>