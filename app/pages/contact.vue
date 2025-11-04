<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p class="text-xl text-gray-600">We're here to help. Get in touch with us and we'll respond as soon as possible.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-semibold mb-4">Send us a message</h2>
              <p class="text-gray-600">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form class="space-y-6" @submit="handleSubmit">
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    type="text" 
                    placeholder="John" 
                    v-model="form.firstName"
                    :class="{'border-red-500': errors.firstName}"
                  />
                  <span v-if="errors.firstName" class="text-sm text-red-500">{{ errors.firstName }}</span>
                </div>
                <div class="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    type="text" 
                    placeholder="Doe" 
                    v-model="form.lastName"
                    :class="{'border-red-500': errors.lastName}"
                  />
                  <span v-if="errors.lastName" class="text-sm text-red-500">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  v-model="form.email"
                  :class="{'border-red-500': errors.email}"
                />
                <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
              </div>

              <div class="space-y-2">
                <Label>Phone Number</Label>
                <Input 
                  type="tel" 
                  placeholder="+233 XX XXX XXXX" 
                  v-model="form.phone"
                  :class="{'border-red-500': errors.phone}"
                />
                <span v-if="errors.phone" class="text-sm text-red-500">{{ errors.phone }}</span>
              </div>

              <div class="space-y-2">
                <Label>Subject</Label>
                <!-- Use native select for reliability -->
                <select 
                  v-model="form.subject"
                  class="w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  :class="{'border-red-500': errors.subject}"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="business">Business Partnership</option>
                </select>
                <span v-if="errors.subject" class="text-sm text-red-500">{{ errors.subject }}</span>
              </div>

              <div class="space-y-2">
                <Label>Message</Label>
                <Textarea 
                  placeholder="How can we help you?" 
                  rows="5" 
                  v-model="form.message"
                  :class="{'border-red-500': errors.message}"
                />
                <span v-if="errors.message" class="text-sm text-red-500">{{ errors.message }}</span>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                class="w-full"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </Button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="lg:pl-12">
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-semibold mb-4">Other ways to connect</h2>
                <p class="text-gray-600">Choose the most convenient way to reach us.</p>
              </div>

              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="bg-primary/10 p-3 rounded-lg">
                    <Phone class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Phone Support</h3>
                    <p class="text-gray-600 mb-2">Monday - Friday, 8am - 6pm</p>
                    <p class="text-primary font-medium">+233 XX XXX XXXX</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="bg-primary/10 p-3 rounded-lg">
                    <Mail class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Email</h3>
                    <p class="text-gray-600 mb-2">We'll respond within 24 hours</p>
                    <p class="text-primary font-medium">support@innovativefinance.com</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="bg-primary/10 p-3 rounded-lg">
                    <MapPin class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Visit Us</h3>
                    <p class="text-gray-600 mb-2">Our headquarters</p>
                    <p class="text-gray-600">123 Financial District<br />Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <!-- Office Hours -->
              <div class="border-t pt-8">
                <h3 class="font-semibold mb-4">Business Hours</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="border-t pt-8">
                <h3 class="font-semibold mb-4">Follow Us</h3>
                <div class="flex gap-4">
                  <a href="#" class="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors">
                    <Facebook class="w-5 h-5 text-primary" />
                  </a>
                  <a href="#" class="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors">
                    <Twitter class="w-5 h-5 text-primary" />
                  </a>
                  <a href="#" class="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors">
                    <Linkedin class="w-5 h-5 text-primary" />
                  </a>
                  <a href="#" class="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors">
                    <Instagram class="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-vue-next'

const router = useRouter()
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)

const validateForm = () => {
  errors.value = {}
  let hasErrors = false
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    toast.error('First name is required')
    hasErrors = true
  }
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    if (!hasErrors) {
      toast.error('Last name is required')
      hasErrors = true
    }
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    if (!hasErrors) {
      toast.error('Email is required')
      hasErrors = true
    }
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    if (!hasErrors) {
      toast.error('Please enter a valid email address')
      hasErrors = true
    }
  }
  
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
    if (!hasErrors) {
      toast.error('Phone number is required')
      hasErrors = true
    }
  } else if (!/^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/.test(form.value.phone)) {
    errors.value.phone = 'Please enter a valid Ghanaian phone number (+233 XX XXX XXXX)'
    if (!hasErrors) {
      toast.error('Please enter a valid Ghanaian phone number')
      hasErrors = true
    }
  }
  
  if (!form.value.subject) {
    errors.value.subject = 'Please select a subject'
    if (!hasErrors) {
      toast.error('Please select a subject')
      hasErrors = true
    }
  }
  
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
    if (!hasErrors) {
      toast.error('Message is required')
      hasErrors = true
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    toast.error('Please fix the errors in the form before submitting')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Here you would typically make an API call to submit the form
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    toast.success('Message sent successfully!')
    await new Promise(resolve => setTimeout(resolve, 500)) // Small delay for toast to be visible
    router.push('/contact/success')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>