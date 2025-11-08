<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white shadow-sm">
      <div class="mx-auto max-w-4xl px-6 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900">Open Your Account</h1>
          <p class="mt-2 text-gray-600">Join thousands of entrepreneurs building their financial future</p>
        </div>
      </div>
    </section>

    <!-- Account Types -->
    <section class="py-12">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-center mb-8">Choose Your Account Type</h2>
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div 
            @click="selectedAccountType = 'personal'" 
            :class="selectedAccountType === 'personal' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
            class="bg-white rounded-lg p-6 border cursor-pointer hover:border-primary transition-colors"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-center mb-2">Personal Account</h3>
            <p class="text-gray-600 text-center mb-4">Perfect for individuals and personal banking needs</p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>No minimum balance</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Mobile banking included</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Debit card included</span>
              </li>
            </ul>
          </div>

          <div 
            @click="selectedAccountType = 'business'" 
            :class="selectedAccountType === 'business' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
            class="bg-white rounded-lg p-6 border cursor-pointer hover:border-primary transition-colors"
          >
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-center mb-2">Business Account</h3>
            <p class="text-gray-600 text-center mb-4">Designed for small businesses and entrepreneurs</p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Business debit card</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Transaction history</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Loan eligibility</span>
              </li>
            </ul>
          </div>

          <div 
            @click="selectedAccountType = 'savings'" 
            :class="selectedAccountType === 'savings' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
            class="bg-white rounded-lg p-6 border cursor-pointer hover:border-primary transition-colors"
          >
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-center mb-2">Savings Account</h3>
            <p class="text-gray-600 text-center mb-4">Start building your financial future today</p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>High interest rates</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Goal-based saving</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Automatic transfers</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Savings Subtype Selection -->
        <div v-if="selectedAccountType === 'savings'" class="mb-12">
          <h3 class="text-xl font-semibold text-center mb-6">Choose Your Savings Account Type</h3>
          <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div 
              @click="selectedSavingsType = 'regular'"
              :class="selectedSavingsType === 'regular' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <PiggyBank class="w-6 h-6 text-blue-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Regular Savings</h4>
              <p class="text-xs text-gray-600">Flexible access</p>
            </div>

            <div 
              @click="selectedSavingsType = 'fixed-deposit'"
              :class="selectedSavingsType === 'fixed-deposit' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Landmark class="w-6 h-6 text-green-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Fixed Deposit</h4>
              <p class="text-xs text-gray-600">Higher rates</p>
            </div>

            <div 
              @click="selectedSavingsType = 'children'"
              :class="selectedSavingsType === 'children' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Baby class="w-6 h-6 text-purple-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Children's Savings</h4>
              <p class="text-xs text-gray-600">For kids</p>
            </div>

            <div 
              @click="selectedSavingsType = 'goal-based'"
              :class="selectedSavingsType === 'goal-based' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target class="w-6 h-6 text-yellow-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Goal-Based</h4>
              <p class="text-xs text-gray-600">Save for goals</p>
            </div>

            <div 
              @click="selectedSavingsType = 'business-savings'"
              :class="selectedSavingsType === 'business-savings' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 class="w-6 h-6 text-orange-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Business Savings</h4>
              <p class="text-xs text-gray-600">For companies</p>
            </div>

            <div 
              @click="selectedSavingsType = 'emergency'"
              :class="selectedSavingsType === 'emergency' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200'"
              class="bg-white rounded-lg p-4 border cursor-pointer hover:border-primary transition-colors text-center"
            >
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield class="w-6 h-6 text-red-600" />
              </div>
              <h4 class="font-semibold text-sm mb-1">Emergency Fund</h4>
              <p class="text-xs text-gray-600">Quick access</p>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <div v-if="selectedAccountType && (selectedAccountType !== 'savings' || selectedSavingsType)" class="bg-white rounded-lg shadow-sm p-8">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">1</span>
            </div>
            <h3 class="text-xl font-semibold">
              {{ selectedAccountType === 'savings' ? getSavingsTypeTitle(selectedSavingsType) : 'Personal Information' }}
            </h3>
          </div>

          <form @submit.prevent="submitApplication" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your first name"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your last name"
                >
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+233 XX XXX XXXX"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input 
                v-model="form.dateOfBirth"
                type="date" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Home Address *</label>
              <textarea 
                v-model="form.address"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your complete address"
              ></textarea>
            </div>

            <div v-if="selectedAccountType === 'business'">
              <div class="border-t pt-6">
                <h4 class="text-lg font-medium mb-4">Business Information</h4>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                    <input 
                      v-model="form.businessName"
                      type="text" 
                      :required="selectedAccountType === 'business'"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter business name"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                    <select 
                      v-model="form.businessType"
                      :required="selectedAccountType === 'business'"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail Trade</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="services">Services</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Document Upload Section -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText class="w-5 h-5" />
                Required Documents
              </h3>
              
              <!-- Identification Document -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Identification Document *
                </label>
                <p class="text-xs text-gray-500 mb-3">Upload a clear photo of your Ghana Card, Voter ID, Passport, or Driver's License</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    ref="idDocumentInput"
                    @change="handleIdDocumentUpload"
                    accept="image/*,.pdf"
                    class="hidden"
                  >
                  <div v-if="!form.documents.idDocument" @click="$refs.idDocumentInput?.click()" class="cursor-pointer">
                    <Upload class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Click to upload ID document</p>
                    <p class="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                  </div>
                  <div v-else class="flex items-center justify-between bg-gray-50 rounded p-3">
                    <div class="flex items-center gap-2">
                      <FileCheck class="w-5 h-5 text-green-600" />
                      <span class="text-sm text-gray-700">{{ form.documents.idDocument.name }}</span>
                    </div>
                    <button 
                      @click="removeDocument('idDocument')"
                      type="button"
                      class="text-red-600 hover:text-red-800"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Passport Picture -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Passport Picture *
                </label>
                <p class="text-xs text-gray-500 mb-3">Upload a clear passport-style photo of yourself</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    ref="passportInput"
                    @change="handlePassportUpload"
                    accept="image/*"
                    class="hidden"
                  >
                  <div v-if="!form.documents.passportPicture" @click="$refs.passportInput?.click()" class="cursor-pointer">
                    <User class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Click to upload passport picture</p>
                    <p class="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                  <div v-else class="flex items-center justify-between bg-gray-50 rounded p-3">
                    <div class="flex items-center gap-2">
                      <FileCheck class="w-5 h-5 text-green-600" />
                      <span class="text-sm text-gray-700">{{ form.documents.passportPicture.name }}</span>
                    </div>
                    <button 
                      @click="removeDocument('passportPicture')"
                      type="button"
                      class="text-red-600 hover:text-red-800"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Digital Signature -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Digital Signature *
                </label>
                <p class="text-xs text-gray-500 mb-3">Draw your signature or upload a scanned signature</p>
                
                <div class="border rounded-lg p-4">
                  <div class="flex gap-2 mb-3">
                    <button
                      type="button"
                      @click="signatureMode = 'draw'"
                      :class="[
                        'px-3 py-1 text-xs rounded',
                        signatureMode === 'draw' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      Draw Signature
                    </button>
                    <button
                      type="button"
                      @click="signatureMode = 'upload'"
                      :class="[
                        'px-3 py-1 text-xs rounded',
                        signatureMode === 'upload' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      Upload Image
                    </button>
                  </div>

                  <!-- Draw Signature -->
                  <div v-if="signatureMode === 'draw'" class="space-y-2">
                    <canvas
                      ref="signatureCanvas"
                      @mousedown="startDrawing"
                      @mousemove="draw"
                      @mouseup="stopDrawing"
                      @touchstart="startDrawing"
                      @touchmove="draw"
                      @touchend="stopDrawing"
                      width="400"
                      height="150"
                      class="border border-gray-300 rounded cursor-crosshair w-full"
                      style="max-width: 100%; height: 150px;"
                    ></canvas>
                    <div class="flex gap-2">
                      <button 
                        type="button"
                        @click="clearSignature"
                        class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        Clear
                      </button>
                      <button 
                        type="button"
                        @click="saveSignature"
                        class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        Save Signature
                      </button>
                    </div>
                  </div>

                  <!-- Upload Signature -->
                  <div v-else class="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    <input
                      type="file"
                      ref="signatureInput"
                      @change="handleSignatureUpload"
                      accept="image/*"
                      class="hidden"
                    >
                    <div v-if="!form.documents.signature" @click="$refs.signatureInput?.click()" class="cursor-pointer">
                      <PenTool class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p class="text-sm text-gray-600">Click to upload signature</p>
                      <p class="text-xs text-gray-400">PNG, JPG up to 1MB</p>
                    </div>
                    <div v-else class="flex items-center justify-center gap-2">
                      <FileCheck class="w-5 h-5 text-green-600" />
                      <span class="text-sm text-gray-700">{{ form.documents.signature.name }}</span>
                      <button 
                        @click="removeDocument('signature')"
                        type="button"
                        class="text-red-600 hover:text-red-800"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Signature Preview -->
                  <div v-if="form.documents.signature && signaturePreview" class="mt-3 p-3 bg-gray-50 rounded">
                    <p class="text-xs text-gray-600 mb-2">Signature Preview:</p>
                    <img :src="signaturePreview" alt="Signature preview" class="h-16 border rounded bg-white">
                  </div>
                </div>
              </div>

              <!-- Document Upload Status -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 class="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Shield class="w-4 h-4" />
                  Document Security
                </h4>
                <ul class="text-xs text-blue-800 space-y-1">
                  <li>• All documents are encrypted and stored securely</li>
                  <li>• Your information is protected by bank-level security</li>
                  <li>• Documents will be reviewed within 24 hours</li>
                </ul>
              </div>
            </div>

            <!-- Terms and Submit -->
            <div class="border-t pt-6">
              <div class="flex items-start gap-3 mb-6">
                <input 
                  v-model="form.agreeToTerms"
                  type="checkbox" 
                  required
                  class="mt-1"
                >
                <label class="text-sm text-gray-600">
                  I agree to the <NuxtLink to="/terms-conditions" class="text-primary hover:underline">Terms and Conditions</NuxtLink> 
                  and <NuxtLink to="/privacy-policy" class="text-primary hover:underline">Privacy Policy</NuxtLink>
                </label>
              </div>

              <Button 
                type="submit" 
                :disabled="isSubmitting"
                size="lg" 
                class="w-full"
              >
                <span v-if="isSubmitting">Processing...</span>
                <span v-else>Submit Application</span>
              </Button>
            </div>
          </form>
        </div>

        <!-- No Account Type Selected -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500">Please select an account type to continue</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  User, 
  Building2, 
  PiggyBank, 
  CheckCircle2,
  FileText,
  Upload,
  FileCheck,
  X,
  PenTool,
  Shield,
  Landmark,
  Baby,
  Target
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Open Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Open your bank account with Innovative Finance. Choose from personal, business, or savings accounts with competitive rates and excellent service.'
    }
  ]
})

const selectedAccountType = ref('')
const selectedSavingsType = ref('')
const isSubmitting = ref(false)

// Check URL parameters for pre-selected account type
const route = useRoute()
const accountTypeMap = {
  'regular': 'savings',
  'fixed-deposit': 'savings', 
  'children': 'savings',
  'goal-based': 'savings',
  'business-savings': 'business',
  'emergency': 'savings'
}

// Set initial account type based on URL parameter
if (route.query.type && accountTypeMap[route.query.type]) {
  selectedAccountType.value = accountTypeMap[route.query.type]
  selectedSavingsType.value = route.query.type
}

// Signature handling
const signatureMode = ref('draw')
const signaturePreview = ref('')
const isDrawing = ref(false)
const lastPoint = ref({ x: 0, y: 0 })

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  businessName: '',
  businessType: '',
  agreeToTerms: false,
  documents: {
    idDocument: null,
    passportPicture: null,
    signature: null
  }
})

// Helper function to get savings type title
const getSavingsTypeTitle = (type) => {
  const titles = {
    'regular': 'Regular Savings Account Application',
    'fixed-deposit': 'Fixed Deposit Account Application',
    'children': 'Children\'s Savings Account Application',
    'goal-based': 'Goal-Based Savings Account Application',
    'business-savings': 'Business Savings Account Application',
    'emergency': 'Emergency Fund Account Application'
  }
  return titles[type] || 'Savings Account Application'
}

// Document upload handlers
const handleIdDocumentUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
    form.value.documents.idDocument = file
  } else {
    alert('File size must be less than 5MB')
    event.target.value = ''
  }
}

const handlePassportUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
    form.value.documents.passportPicture = file
  } else {
    alert('File size must be less than 2MB')
    event.target.value = ''
  }
}

const handleSignatureUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
    form.value.documents.signature = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      signaturePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    alert('File size must be less than 1MB')
    event.target.value = ''
  }
}

const removeDocument = (documentType) => {
  form.value.documents[documentType] = null
  if (documentType === 'signature') {
    signaturePreview.value = ''
  }
}

// Signature canvas methods
const getCanvas = () => {
  return document.querySelector('canvas')
}

const getContext = () => {
  const canvas = getCanvas()
  return canvas ? canvas.getContext('2d') : null
}

const startDrawing = (event) => {
  isDrawing.value = true
  const canvas = getCanvas()
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const x = (event.clientX || event.touches?.[0]?.clientX) - rect.left
  const y = (event.clientY || event.touches?.[0]?.clientY) - rect.top
  
  lastPoint.value = { x, y }
  event.preventDefault()
}

const draw = (event) => {
  if (!isDrawing.value) return
  
  const canvas = getCanvas()
  const ctx = getContext()
  if (!canvas || !ctx) return
  
  const rect = canvas.getBoundingClientRect()
  const x = (event.clientX || event.touches?.[0]?.clientX) - rect.left
  const y = (event.clientY || event.touches?.[0]?.clientY) - rect.top
  
  ctx.beginPath()
  ctx.moveTo(lastPoint.value.x, lastPoint.value.y)
  ctx.lineTo(x, y)
  ctx.stroke()
  
  lastPoint.value = { x, y }
  event.preventDefault()
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearSignature = () => {
  const canvas = getCanvas()
  const ctx = getContext()
  if (!canvas || !ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  form.value.documents.signature = null
  signaturePreview.value = ''
}

const saveSignature = () => {
  const canvas = getCanvas()
  if (!canvas) return
  
  // Convert canvas to blob
  canvas.toBlob((blob) => {
    if (blob) {
      const file = new File([blob], 'signature.png', { type: 'image/png' })
      form.value.documents.signature = file
      signaturePreview.value = canvas.toDataURL()
    }
  })
}

// Initialize canvas when component mounts
onMounted(() => {
  const canvas = getCanvas()
  const ctx = getContext()
  if (canvas && ctx) {
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000000'
  }
})

const submitApplication = async () => {
  isSubmitting.value = true
  
  // Validate required documents
  if (!form.value.documents.idDocument) {
    alert('Please upload your identification document')
    isSubmitting.value = false
    return
  }
  
  if (!form.value.documents.passportPicture) {
    alert('Please upload your passport picture')
    isSubmitting.value = false
    return
  }
  
  if (!form.value.documents.signature) {
    alert('Please provide your digital signature')
    isSubmitting.value = false
    return
  }
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend including documents
    console.log('Application submitted:', {
      accountType: selectedAccountType.value,
      savingsType: selectedSavingsType.value,
      personalInfo: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        dateOfBirth: form.value.dateOfBirth,
        address: form.value.address,
        businessName: form.value.businessName,
        businessType: form.value.businessType
      },
      documents: {
        idDocument: form.value.documents.idDocument?.name,
        passportPicture: form.value.documents.passportPicture?.name,
        signature: form.value.documents.signature?.name
      }
    })
    
    // Show success message and redirect
    alert('Application submitted successfully! We will review your documents and contact you within 24 hours.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      businessName: '',
      businessType: '',
      agreeToTerms: false,
      documents: {
        idDocument: null,
        passportPicture: null,
        signature: null
      }
    }
    selectedAccountType.value = ''
    selectedSavingsType.value = ''
    signaturePreview.value = ''
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('There was an error submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>