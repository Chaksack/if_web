<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p class="text-xl text-gray-600">Learn how we collect, use, and protect your personal information.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="prose max-w-none">
          <div class="mb-12">
            <h2>1. Introduction</h2>
            <p>At Innovative Finance, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
          </div>

          <div class="mb-12">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Full name and contact details</li>
              <li>Date of birth and national ID information</li>
              <li>Employment and income information</li>
              <li>Bank account details</li>
              <li>Credit history and financial information</li>
            </ul>

            <h3 class="mt-6">2.2 Automatically Collected Information</h3>
            <p>When you use our services, we automatically collect:</p>
            <ul>
              <li>Device information and IP addresses</li>
              <li>Browser type and version</li>
              <li>Usage patterns and preferences</li>
              <li>Location information</li>
            </ul>
          </div>

          <div class="mb-12">
            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Process loan applications and credit assessments</li>
              <li>Provide customer support and services</li>
              <li>Send important notifications and updates</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </div>

          <div class="mb-12">
            <h2>4. Data Protection</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against:</p>
            <ul>
              <li>Unauthorized access</li>
              <li>Accidental loss or destruction</li>
              <li>Unlawful processing</li>
            </ul>
          </div>

          <div class="mb-12">
            <h2>5. Your Rights</h2>
            <p>Under data protection laws, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </div>

          <div class="mb-12">
            <h2>6. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Credit reference agencies</li>
              <li>Financial institutions and partners</li>
              <li>Regulatory authorities</li>
              <li>Service providers and contractors</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </div>

          <div class="mb-12">
            <h2>7. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to:</p>
            <ul>
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
          </div>

          <div class="mb-12">
            <h2>8. Contact Us</h2>
            <p>For privacy-related inquiries or to exercise your rights, contact our Data Protection Officer:</p>
            <ul>
              <li>Email: privacy@innovativefinance.com</li>
              <li>Phone: +233 XX XXX XXXX</li>
              <li>Address: 123 Financial District, Accra, Ghana</li>
            </ul>
          </div>

          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">Last updated: November 4, 2025</p>
            <p class="text-sm text-gray-600 mt-2">This privacy policy complies with the Data Protection Act of Ghana and other applicable privacy laws and regulations.</p>
          </div>

          <!-- Cookie Settings -->
          <div class="mt-12 border-t pt-8">
            <h2 class="text-xl font-semibold mb-6">Cookie Preferences</h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Essential Cookies</h3>
                  <p class="text-sm text-gray-600">Required for the website to function properly</p>
                </div>
                <Switch disabled checked />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Analytics Cookies</h3>
                  <p class="text-sm text-gray-600">Help us improve our website</p>
                </div>
                <Switch v-model="cookiePreferences.analytics" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Marketing Cookies</h3>
                  <p class="text-sm text-gray-600">Used for targeted advertising</p>
                </div>
                <Switch v-model="cookiePreferences.marketing" />
              </div>

              <Button @click="saveCookiePreferences" class="mt-4">
                Save Cookie Preferences
              </Button>
            </div>
          </div>

          <!-- Data Request Form -->
          <div class="mt-12 border-t pt-8">
            <h2 class="text-xl font-semibold mb-6">Request Your Data</h2>
            <p class="text-gray-600 mb-6">You can request a copy of your personal data or ask for it to be deleted.</p>
            
            <form @submit.prevent="submitDataRequest" class="space-y-4 max-w-md">
              <div class="space-y-2">
                <Label>Request Type</Label>
                <Select v-model="dataRequest.type">
                  <option value="export">Export my data</option>
                  <option value="delete">Delete my data</option>
                </Select>
              </div>

              <div class="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email" 
                  v-model="dataRequest.email" 
                  placeholder="Enter your registered email"
                  required
                />
              </div>

              <div class="space-y-2">
                <Label>Reason (Optional)</Label>
                <Textarea 
                  v-model="dataRequest.reason"
                  placeholder="Please tell us why you're making this request"
                  rows="3"
                />
              </div>

              <Button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'

const cookiePreferences = ref({
  analytics: true,
  marketing: false
})

const dataRequest = ref({
  type: 'export',
  email: '',
  reason: ''
})

const isSubmitting = ref(false)

function saveCookiePreferences() {
  // Here you would typically save these preferences to your backend
  toast.success('Cookie preferences saved successfully')
}

async function submitDataRequest() {
  isSubmitting.value = true
  try {
    // Here you would typically submit the request to your backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Your request has been submitted successfully')
    dataRequest.value = {
      type: 'export',
      email: '',
      reason: ''
    }
  } catch (error) {
    toast.error('Failed to submit request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>