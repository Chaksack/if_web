<template>
  <div>
    <!-- Chat Button -->
    <button
      @click="isOpen = !isOpen"
      :class="[
        'fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300',
        isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-white text-gray-800'
      ]"
    >
      <MessageCircle v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Chat Window -->
    <div
      v-show="isOpen"
      class="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden border"
    >
      <!-- Header -->
      <div class="bg-primary p-4 text-white">
        <div class="flex items-center gap-3">
          <div class="relative">
            <img 
              src="/images/agent-avatar.png" 
              alt="Support Agent"
              class="w-10 h-10 rounded-full"
              @error="onAvatarError"
            />
            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 class="font-semibold">Customer Support</h3>
            <p class="text-sm opacity-90">Online | Typically replies in 2 mins</p>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="h-96 overflow-y-auto p-4 space-y-4" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index"
          class="space-y-3"
        >
          <div :class="[
            'max-w-[80%] rounded-lg p-3',
            message.type === 'agent' ? 'bg-gray-100 text-gray-800' : 'bg-primary text-white ml-auto'
          ]">
            <div v-if="message.title" class="font-medium mb-1">{{ message.title }}</div>
            <div v-if="message.text" v-html="formatMessageText(message.text)"></div>
            <div v-if="message.details" class="mt-2 text-sm">
              <ul class="list-disc list-inside space-y-1">
                <li v-for="detail in message.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
            <div 
              :class="[
                'text-xs mt-2',
                message.type === 'agent' ? 'text-gray-500' : 'text-white/80'
              ]"
            >
              {{ message.time }}
            </div>
          </div>

          <!-- Quick Reply Buttons -->
          <div v-if="message.quickReplies && message.type === 'agent'" 
               class="flex flex-wrap gap-2">
            <Button
              v-for="reply in message.quickReplies"
              :key="reply.text"
              variant="outline"
              size="sm"
              @click="handleQuickReply(reply)"
              class="text-sm"
            >
              {{ reply.text }}
            </Button>
          </div>

          <!-- Product Cards -->
          <div v-if="message.products" 
               class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div v-for="product in message.products" 
                 :key="product.title"
                 class="bg-white rounded-lg border p-3 hover:shadow-md transition-shadow">
              <h4 class="font-medium text-sm mb-1">{{ product.title }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
              <div class="text-sm">
                <div v-if="product.rate" class="text-primary font-medium">
                  Rate: {{ product.rate }}
                </div>
                <div v-if="product.term" class="text-gray-600">
                  Term: {{ product.term }}
                </div>
              </div>
              <Button 
                variant="link" 
                size="sm" 
                class="mt-2 p-0"
                @click="handleProductClick(product)"
              >
                Learn more →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t p-4">
        <form @submit.prevent="sendMessage" class="space-y-3">
          <div class="flex gap-2">
            <Textarea
              v-model="newMessage"
              placeholder="Type your message..."
              class="flex-1 min-h-[44px] max-h-32"
              :rows="1"
              @keydown.enter.prevent="sendMessage"
            />
            <Button 
              type="submit"
              :disabled="!newMessage.trim()"
              class="shrink-0"
            >
              <Send class="w-4 h-4" />
            </Button>
          </div>
          <!-- Suggested Questions -->
          <div v-if="suggestedQuestions.length" class="flex flex-wrap gap-2">
            <Button
              v-for="question in suggestedQuestions"
              :key="question"
              variant="outline"
              size="sm"
              @click="handleSuggestedQuestion(question)"
              class="text-xs"
            >
              {{ question }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { MessageCircle, X, Send } from 'lucide-vue-next'
import { Button } from '../button'
import Textarea from '../textarea/index.vue'

interface QuickReply {
  text: string
  action: string
}

interface Product {
  title: string
  description: string
  rate?: string
  term?: string
  minAmount?: string
  maxAmount?: string
  limit?: string
  annualFee?: string
  link?: string
}

interface Message {
  type: 'agent' | 'user'
  text?: string
  title?: string
  time: string
  quickReplies?: QuickReply[]
  details?: string[]
  products?: Product[]
}

// Accept props for external control
interface Props {
  initialOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialOpen: false
})

// Expose methods to parent
const isOpen = ref(props.initialOpen)
const openChat = () => { isOpen.value = true }
const closeChat = () => { isOpen.value = false }
const toggleChat = () => { isOpen.value = !isOpen.value }

defineExpose({
  openChat,
  closeChat,
  toggleChat,
  isOpen
})

// Listen for custom event to open chat from anywhere
const handleOpenChatEvent = () => {
  openChat()
}

onMounted(() => {
  window.addEventListener('open-live-chat', handleOpenChatEvent)
})

onUnmounted(() => {
  window.removeEventListener('open-live-chat', handleOpenChatEvent)
})

const newMessage = ref('')
const messages = ref<Message[]>([
  {
    type: 'agent',
    text: 'Hello! How can I help you today?',
    time: formatTime(new Date()),
    quickReplies: [
      { text: 'Loan Information', action: 'loan_info' },
      { text: 'Credit Cards', action: 'credit_cards' },
      { text: 'Open Account', action: 'open_account' },
      { text: 'Support', action: 'support' }
    ]
  }
])
const messageContainer = ref<HTMLDivElement | null>(null)
const suggestedQuestions = ref<string[]>([
  'What are your loan rates?',
  'How do I apply for a credit card?',
  'Where are your branches?'
])

// Initialize router at top level
const router = useRouter()

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

function formatMessageText(text: string): string {
  return text.replace(/\n/g, '<br>')
}

function handleQuickReply(reply: QuickReply): void {
  newMessage.value = reply.text
  sendMessage()
}

function handleSuggestedQuestion(question: string): void {
  newMessage.value = question
  sendMessage()
}

function handleProductClick(product: Product): void {
  // Here you would typically navigate to the product page
  router.push(product.link || '/loans')
}

// Product data
const products = {
  personalLoans: [
    {
      title: 'Quick Personal Loan',
      description: 'Fast approval for your immediate needs',
      rate: '15% p.a.',
      term: '12-60 months',
      minAmount: 'GHS 1,000',
      maxAmount: 'GHS 100,000',
      link: '/loans/personal'
    },
    {
      title: 'Salary Advance',
      description: 'Get up to 70% of your monthly salary',
      rate: '12% p.a.',
      term: '1-3 months',
      minAmount: 'GHS 500',
      maxAmount: 'GHS 20,000',
      link: '/loans/salary-advance'
    }
  ],
  businessLoans: [
    {
      title: 'SME Business Loan',
      description: 'Grow your small business',
      rate: '18% p.a.',
      term: '12-84 months',
      minAmount: 'GHS 50,000',
      maxAmount: 'GHS 1,000,000',
      link: '/loans/business'
    },
    {
      title: 'Equipment Financing',
      description: 'Finance your business equipment',
      rate: '16% p.a.',
      term: '12-60 months',
      minAmount: 'GHS 20,000',
      maxAmount: 'GHS 500,000',
      link: '/loans/equipment'
    }
  ],
  creditCards: [
    {
      title: 'Classic Card',
      description: '1% cashback on all purchases',
      rate: '25% p.a.',
      limit: 'Up to GHS 10,000',
      annualFee: 'GHS 100',
      link: '/credit-cards#classic'
    },
    {
      title: 'Gold Card',
      description: '2% cashback + travel insurance',
      rate: '22% p.a.',
      limit: 'Up to GHS 30,000',
      annualFee: 'GHS 250',
      link: '/credit-cards#gold'
    }
  ]
}

function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

function onAvatarError(e: Event): void {
  const target = e.target as HTMLImageElement
  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23475569"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20">CS</text></svg>'
}

async function sendMessage(): Promise<void> {
  if (!newMessage.value.trim()) return

  // Add user message
  messages.value.push({
    type: 'user',
    text: newMessage.value,
    time: formatTime(new Date())
  })

  const userMessage = newMessage.value
  newMessage.value = ''
  scrollToBottom()

  // Simulate agent typing
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Add agent response
  const response = getAutoResponse(userMessage)
  const agentMessage: Message = {
    type: 'agent',
    time: formatTime(new Date()),
    ...(typeof response === 'string' ? { text: response } : response)
  }
  messages.value.push(agentMessage)

  scrollToBottom()
}

type AutoResponse = string | Partial<Omit<Message, 'type' | 'time'>>

function getAutoResponse(message: string): AutoResponse {
  const responses = {
    default: {
      text: "Thank you for your message. Our team will get back to you shortly.",
      quickReplies: [
        { text: "View Products", action: "products" },
        { text: "Contact Support", action: "support" }
      ]
    },
    greetings: {
      text: "Hello! How can I assist you today?",
      quickReplies: [
        { text: "Loan Information", action: "loan_info" },
        { text: "Credit Cards", action: "credit_cards" },
        { text: "Open Account", action: "open_account" }
      ]
    },
    goodbye: {
      text: "Thank you for chatting with us! If you need anything else, don't hesitate to reach out.",
      quickReplies: [
        { text: "Rate our service", action: "feedback" },
        { text: "More help", action: "help" }
      ]
    },
    thanks: {
      text: "You're welcome! Is there anything else I can help you with?",
      quickReplies: [
        { text: "Yes", action: "more_help" },
        { text: "No, thanks", action: "end_chat" }
      ]
    },
    
    // Loan Related
    loan: {
      title: "Loan Products",
      text: "I can help you with information about our loan products. Which type interests you?",
      quickReplies: [
        { text: "Personal Loans", action: "personal_loan" },
        { text: "Business Loans", action: "business_loan" },
        { text: "Home Loans", action: "home_loan" }
      ]
    },
    personalLoan: {
      title: "Personal Loan Options",
      text: "Here are our personal loan products:",
      products: products.personalLoans,
      details: [
        "Rates from 15% p.a.",
        "Amounts up to GHS 100,000",
        "Flexible terms 12-60 months",
        "No collateral required for amounts under GHS 20,000"
      ],
      quickReplies: [
        { text: "Apply Now", action: "apply_personal_loan" },
        { text: "Calculate EMI", action: "loan_calculator" },
        { text: "Requirements", action: "loan_requirements" }
      ]
    },
    businessLoan: {
      title: "Business Loan Solutions",
      text: "Explore our business financing options:",
      products: products.businessLoans,
      details: [
        "Competitive rates from 18% p.a.",
        "Amounts from GHS 50,000 to GHS 5,000,000",
        "Customized repayment plans",
        "Additional working capital options available"
      ],
      quickReplies: [
        { text: "Speak to Specialist", action: "business_specialist" },
        { text: "View Requirements", action: "business_requirements" },
        { text: "Book Appointment", action: "book_appointment" }
      ]
    },
    homeLoan: "Our home loans come with competitive interest rates and terms up to 20 years. We finance up to 80% of the property value. Would you like to use our mortgage calculator?",
    loanRequirements: "For loan applications, you'll typically need: Valid ID, Proof of income (3 months), Bank statements (6 months), and Tax returns. Specific requirements may vary by loan type.",
    
    // Card Related
    creditCard: "We offer several credit card options with different benefits. Our cards include Classic, Gold, and Platinum tiers. Would you like to compare our card features?",
    cardLimits: "Credit limits vary based on your income and creditworthiness. Our cards start from GHS 2,000 up to GHS 50,000 for Platinum cards.",
    cardFees: "Our credit cards have competitive annual fees starting from GHS 100. We also offer fee waivers for the first year. Would you like to see our complete fee structure?",
    
    // Account Related
    account: "We offer various account types including savings, checking, and business accounts. What type of account are you interested in?",
    onlineBanking: "Our online banking platform lets you manage your accounts 24/7. You can make transfers, pay bills, and view statements. Need help getting started?",
    mobileBanking: "Our mobile banking app is available for both iOS and Android. You can download it from the App Store or Google Play Store. Would you like the download links?",
    
    // Support Related
    contact: "You can reach us at support@innovativefinance.com or call us at +233 XX XXX XXXX (Mon-Fri, 8am-6pm).",
    help: "I'm here to help! Could you please specify what you need assistance with?",
    branches: "We have branches across major cities in Ghana. Would you like to find the nearest branch to you?",
    hours: "Our branches are open Monday-Friday (8:00 AM - 6:00 PM) and Saturday (9:00 AM - 1:00 PM). Our online services are available 24/7.",
    
    // Security Related
    security: "Your security is our priority. We use industry-standard encryption and multi-factor authentication. Never share your password or OTP with anyone.",
    fraud: "If you suspect any fraudulent activity, please contact our 24/7 fraud hotline immediately at +233 XX XXX XXXX.",
    password: "You can reset your password through our online banking portal. Click 'Forgot Password' on the login page. Never share your password with anyone.",
    
    // Technical Issues
    error: "I'm sorry you're experiencing issues. Try clearing your browser cache or using our mobile app. If the problem persists, our technical team can help.",
    maintenance: "If you're seeing an error message, we might be performing system maintenance. Please try again in a few minutes.",
    
    // Fees and Charges
    fees: "Our fee structure is transparent and competitive. Would you like to see our current fees and charges for specific services?",
    rates: "Our current interest rates are updated regularly. Would you like to know about rates for a specific product?",
    
    // Application Status
    status: "To check your application status, please log in to your account or provide your application reference number.",
    documents: "You can submit documents online through our secure portal or visit any branch. Make sure all documents are clear and legible."
  }

  const lowercaseMsg = message.toLowerCase()
  
  // Greetings
  if (lowercaseMsg.match(/hi|hello|hey|good\s*(morning|afternoon|evening)/)) return responses.greetings
  if (lowercaseMsg.match(/bye|goodbye|thank\s*you|thanks/)) return responses.thanks
  
  // Loans
  if (lowercaseMsg.match(/personal\s*loan/)) return responses.personalLoan
  if (lowercaseMsg.match(/business\s*loan/)) return responses.businessLoan
  if (lowercaseMsg.match(/home\s*loan|mortgage/)) return responses.homeLoan
  if (lowercaseMsg.match(/loan\s*requirement|document|need\s*for\s*loan/)) return responses.loanRequirements
  if (lowercaseMsg.includes('loan')) return responses.loan
  
  // Cards
  if (lowercaseMsg.match(/card\s*(limit|maximum|ceiling|cap)/i)) return responses.cardLimits
  if (lowercaseMsg.match(/(card|annual|monthly)\s*(fee|charge|cost)/i)) return responses.cardFees
  if (lowercaseMsg.match(/(credit|debit)\s*card|master\s*card|visa/i)) return {
    title: "Credit Card Options",
    text: "Here are our available credit cards:",
    products: products.creditCards,
    quickReplies: [
      { text: "Compare Cards", action: "compare_cards" },
      { text: "Apply Now", action: "apply_card" },
      { text: "Card Benefits", action: "card_benefits" }
    ]
  }
  
  // Account and Banking
  if (lowercaseMsg.match(/mobile\s*(app|banking)|bank\s*app|phone\s*app/i)) return {
    title: "Mobile Banking",
    text: "Our mobile banking app offers:",
    details: [
      "24/7 account access",
      "Bill payments and transfers",
      "Mobile check deposit",
      "Account alerts and notifications",
      "Biometric security"
    ],
    quickReplies: [
      { text: "Download App", action: "download_app" },
      { text: "View Features", action: "app_features" },
      { text: "Setup Guide", action: "app_setup" }
    ]
  }
  if (lowercaseMsg.match(/online\s*banking|internet\s*banking|web\s*banking/i)) return responses.onlineBanking
  if (lowercaseMsg.match(/account\s*(type|option)|open\s*(account|banking)|start\s*banking/i)) return {
    title: "Account Types",
    text: "Choose from our range of accounts:",
    products: [
      {
        title: "Basic Savings",
        description: "No minimum balance, 2.5% interest p.a.",
        rate: "2.5% p.a.",
        term: "Instant access"
      },
      {
        title: "Premium Current",
        description: "Free checkbook, unlimited transactions",
        rate: "0.5% p.a.",
        term: "Daily interest"
      }
    ],
    quickReplies: [
      { text: "Open Account", action: "open_account" },
      { text: "Compare Accounts", action: "compare_accounts" },
      { text: "View Requirements", action: "account_requirements" }
    ]
  }
  
  // Support
  if (lowercaseMsg.match(/contact|reach|call/)) return responses.contact
  if (lowercaseMsg.match(/help|support|assist/)) return responses.help
  if (lowercaseMsg.match(/branch|location|office/)) return responses.branches
  if (lowercaseMsg.match(/hour|time|open|close/)) return responses.hours
  
  // Security
  if (lowercaseMsg.match(/security|secure/)) return responses.security
  if (lowercaseMsg.match(/fraud|scam|suspicious/)) return responses.fraud
  if (lowercaseMsg.match(/password|reset|forgot/)) return responses.password
  
  // Technical
  if (lowercaseMsg.match(/error|issue|problem|not\s*working/)) return responses.error
  if (lowercaseMsg.match(/maintenance|down|unavailable/)) return responses.maintenance
  
  // Fees and Rates
  if (lowercaseMsg.match(/fee|charge|cost/)) return responses.fees
  if (lowercaseMsg.match(/rate|interest|percentage/)) return responses.rates
  
  // Application
  if (lowercaseMsg.match(/status|application\s*status/)) return responses.status
  if (lowercaseMsg.match(/document|submit|upload/)) return responses.documents
  
  return responses.default
}

// Scroll to bottom when chat opens
watch(isOpen, (newValue) => {
  if (newValue) {
    scrollToBottom()
  }
})

// Auto-scroll when new messages are added
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>