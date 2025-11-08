<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Guest User Redirect -->
    <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserCheck class="w-8 h-8 text-primary" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Account Required</h2>
        <p class="text-gray-600 mb-6">
          To apply for a loan, you need to create an account or sign in to your existing account.
        </p>
        <div class="space-y-3">
          <Button @click="navigateTo('/apply-loan-guest')" class="w-full">
            Create Account & Apply
          </Button>
          <Button @click="navigateTo('/sign-in')" variant="outline" class="w-full">
            Sign In to Existing Account
          </Button>
        </div>
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Why create an account?</strong><br>
            Track your application status, manage documents, and access your loan dashboard.
          </p>
        </div>
      </div>
    </div>

    <!-- Authenticated User Content -->
    <div v-else>
      <!-- Header -->
      <section class="bg-white shadow-sm">
        <div class="mx-auto max-w-4xl px-6 py-8">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900">Apply for a Loan</h1>
            <p class="mt-2 text-gray-600">Complete your microfinance loan application in 3 simple steps</p>
          </div>
        </div>
      </section>

    <!-- Progress Steps -->
    <section class="py-6 bg-white border-b">
      <div class="mx-auto max-w-4xl px-6">
        <div class="flex items-center justify-center space-x-8">
          <div class="flex items-center">
            <div :class="currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'" class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <span class="ml-2 text-sm font-medium">Loan Type</span>
          </div>
          <div class="w-12 h-px bg-gray-200"></div>
          <div class="flex items-center">
            <div :class="currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'" class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <span class="ml-2 text-sm font-medium">Details</span>
          </div>
          <div class="w-12 h-px bg-gray-200"></div>
          <div class="flex items-center">
            <div :class="currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'" class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <span class="ml-2 text-sm font-medium">Review</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="mx-auto max-w-4xl px-6">
        <!-- Step 1: Loan Type Selection -->
        <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold mb-8">Choose Your Loan Type</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div 
              @click="selectLoanType('business')" 
              :class="selectedLoanType === 'business' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Business Loan</h3>
              <p class="text-gray-600 text-center mb-4">Funding for business expansion and operations</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 1,000 - 100,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>6-36 months repayment</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Competitive interest rates</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('personal')" 
              :class="selectedLoanType === 'personal' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Personal Loan</h3>
              <p class="text-gray-600 text-center mb-4">Personal financing for your individual needs</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 500 - 50,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>3-24 months repayment</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Quick approval process</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('agricultural')" 
              :class="selectedLoanType === 'agricultural' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wheat class="w-8 h-8 text-yellow-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Agricultural Loan</h3>
              <p class="text-gray-600 text-center mb-4">Seasonal financing for farmers and agricultural businesses</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 2,000 - 200,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Seasonal repayment terms</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Flexible payment schedule</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('emergency')" 
              :class="selectedLoanType === 'emergency' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle class="w-8 h-8 text-red-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Emergency Loan</h3>
              <p class="text-gray-600 text-center mb-4">Quick access to funds for unexpected expenses</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 200 - 10,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>24-hour approval</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Minimal documentation</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('auto')" 
              :class="selectedLoanType === 'auto' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Auto Loan</h3>
              <p class="text-gray-600 text-center mb-4">Finance your vehicle purchase with competitive rates</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 5,000 - 150,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Up to 60 months</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>New & used vehicles</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('education')" 
              :class="selectedLoanType === 'education' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Education Loan</h3>
              <p class="text-gray-600 text-center mb-4">Invest in your education for a brighter future</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 1,000 - 50,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Flexible repayment</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Low interest rates</span>
                </li>
              </ul>
            </div>

            <div 
              @click="selectLoanType('home')" 
              :class="selectedLoanType === 'home' ? 'border-primary ring-2 ring-primary' : 'border-gray-200'"
              class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
            >
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-2">Home Loan</h3>
              <p class="text-gray-600 text-center mb-4">Make homeownership dreams come true</p>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>GHS 50,000 - 500,000</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Up to 30 years</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Competitive rates</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 text-center">
            <Button 
              @click="nextStep" 
              :disabled="!selectedLoanType"
              size="lg"
            >
              Continue to Application
            </Button>
          </div>
        </div>

        <!-- Step 2: Loan Application Form -->
        <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold mb-8">Loan Application Details</h2>
          
          <form @submit.prevent="nextStep" class="space-y-6">
            <!-- Loan Amount and Purpose -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Loan Amount (GHS) *</label>
                <input 
                  id="amount"
                  v-model="application.amount"
                  type="number" 
                  required
                  :min="getLoanLimits().min"
                  :max="getLoanLimits().max"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  :placeholder="`${getLoanLimits().min} - ${getLoanLimits().max}`"
                >
              </div>
              <div>
                <label for="term" class="block text-sm font-medium text-gray-700 mb-2">Repayment Term *</label>
                <select 
                  id="term"
                  v-model="application.term"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select term</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                  <option value="36" v-if="selectedLoanType === 'business' || selectedLoanType === 'agricultural'">36 months</option>
                </select>
              </div>
            </div>

            <div>
              <label for="purpose" class="block text-sm font-medium text-gray-700 mb-2">Loan Purpose *</label>
              <textarea 
                id="purpose"
                v-model="application.purpose"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Please describe how you plan to use the loan"
              ></textarea>
            </div>

            <!-- Employment/Business Information -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-medium mb-4">{{ selectedLoanType === 'business' ? 'Business' : 'Employment' }} Information</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div v-if="selectedLoanType !== 'business'">
                  <label for="employer" class="block text-sm font-medium text-gray-700 mb-2">Employer Name *</label>
                  <input 
                    id="employer"
                    v-model="application.employer"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter employer name"
                  >
                </div>
                <div v-else>
                  <label for="businessName" class="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input 
                    id="businessName"
                    v-model="application.businessName"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter business name"
                  >
                </div>
                <div>
                  <label for="monthlyIncome" class="block text-sm font-medium text-gray-700 mb-2">Monthly Income (GHS) *</label>
                  <input 
                    id="monthlyIncome"
                    v-model="application.monthlyIncome"
                    type="number" 
                    required
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter monthly income"
                  >
                </div>
              </div>
            </div>

            <!-- Supporting Documents -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText class="w-5 h-5" />
                Supporting Documents
              </h3>
              
              <!-- Income Verification -->
              <div class="mb-4" v-if="selectedLoanType !== 'business'">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Income Verification *
                </label>
                <p class="text-xs text-gray-500 mb-2">Upload your latest payslip or salary certificate</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    ref="incomeDocInput"
                    @change="handleIncomeDocUpload"
                    accept="image/*,.pdf"
                    class="hidden"
                  >
                  <div v-if="!application.documents.incomeVerification" @click="$refs.incomeDocInput?.click()" class="cursor-pointer">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Click to upload income document</p>
                    <p class="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
                  </div>
                  <div v-else class="flex items-center justify-between bg-gray-50 rounded p-2">
                    <div class="flex items-center gap-2">
                      <FileCheck class="w-4 h-4 text-green-600" />
                      <span class="text-xs text-gray-700">{{ application.documents.incomeVerification.name }}</span>
                    </div>
                    <button @click="removeLoanDocument('incomeVerification')" type="button" class="text-red-600 hover:text-red-800">
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Business Registration -->
              <div class="mb-4" v-if="selectedLoanType === 'business'">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Business Registration Certificate *
                </label>
                <p class="text-xs text-gray-500 mb-2">Upload your business registration or permit</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    ref="businessDocInput"
                    @change="handleBusinessDocUpload"
                    accept="image/*,.pdf"
                    class="hidden"
                  >
                  <div v-if="!application.documents.businessRegistration" @click="$refs.businessDocInput?.click()" class="cursor-pointer">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Click to upload business document</p>
                    <p class="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
                  </div>
                  <div v-else class="flex items-center justify-between bg-gray-50 rounded p-2">
                    <div class="flex items-center gap-2">
                      <FileCheck class="w-4 h-4 text-green-600" />
                      <span class="text-xs text-gray-700">{{ application.documents.businessRegistration.name }}</span>
                    </div>
                    <button @click="removeLoanDocument('businessRegistration')" type="button" class="text-red-600 hover:text-red-800">
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Bank Statement -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Bank Statement *
                </label>
                <p class="text-xs text-gray-500 mb-2">Upload your last 3 months bank statement</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    ref="bankStatementInput"
                    @change="handleBankStatementUpload"
                    accept="image/*,.pdf"
                    class="hidden"
                  >
                  <div v-if="!application.documents.bankStatement" @click="$refs.bankStatementInput?.click()" class="cursor-pointer">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Click to upload bank statement</p>
                    <p class="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
                  </div>
                  <div v-else class="flex items-center justify-between bg-gray-50 rounded p-2">
                    <div class="flex items-center gap-2">
                      <FileCheck class="w-4 h-4 text-green-600" />
                      <span class="text-xs text-gray-700">{{ application.documents.bankStatement.name }}</span>
                    </div>
                    <button @click="removeLoanDocument('bankStatement')" type="button" class="text-red-600 hover:text-red-800">
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6 border-t">
              <Button 
                type="button"
                @click="previousStep" 
                variant="outline"
                size="lg"
              >
                Back
              </Button>
              <Button 
                type="submit"
                size="lg"
              >
                Review Application
              </Button>
            </div>
          </form>
        </div>

        <!-- Step 3: Review and Submit -->
        <div v-if="currentStep === 3" class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold mb-8">Review Your Application</h2>
          
          <div class="space-y-6">
            <!-- Loan Summary -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Loan Summary</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <span class="text-sm text-gray-600">Loan Type:</span>
                  <div class="font-medium capitalize">{{ selectedLoanType }} Loan</div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Amount:</span>
                  <div class="font-medium">GHS {{ parseInt(application.amount).toLocaleString() }}</div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Term:</span>
                  <div class="font-medium">{{ application.term }} months</div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Monthly Payment:</span>
                  <div class="font-medium text-primary">GHS {{ calculateMonthlyPayment().toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Application Details -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Application Details</h3>
              <div class="space-y-3">
                <div>
                  <span class="text-sm text-gray-600">Purpose:</span>
                  <div class="font-medium">{{ application.purpose }}</div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">{{ selectedLoanType === 'business' ? 'Business Name' : 'Employer' }}:</span>
                  <div class="font-medium">{{ application.employer || application.businessName }}</div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Monthly Income:</span>
                  <div class="font-medium">GHS {{ parseInt(application.monthlyIncome).toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Uploaded Documents -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Uploaded Documents</h3>
              <div class="space-y-3">
                <div v-if="selectedLoanType !== 'business' && application.documents.incomeVerification">
                  <span class="text-sm text-gray-600">Income Verification:</span>
                  <div class="flex items-center gap-2 mt-1">
                    <FileCheck class="w-4 h-4 text-green-600" />
                    <span class="text-sm font-medium">{{ application.documents.incomeVerification.name }}</span>
                  </div>
                </div>
                <div v-if="selectedLoanType === 'business' && application.documents.businessRegistration">
                  <span class="text-sm text-gray-600">Business Registration:</span>
                  <div class="flex items-center gap-2 mt-1">
                    <FileCheck class="w-4 h-4 text-green-600" />
                    <span class="text-sm font-medium">{{ application.documents.businessRegistration.name }}</span>
                  </div>
                </div>
                <div v-if="application.documents.bankStatement">
                  <span class="text-sm text-gray-600">Bank Statement:</span>
                  <div class="flex items-center gap-2 mt-1">
                    <FileCheck class="w-4 h-4 text-green-600" />
                    <span class="text-sm font-medium">{{ application.documents.bankStatement.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="border-t pt-6">
              <div class="flex items-start gap-3 mb-6">
                <input 
                  v-model="application.agreeToTerms"
                  type="checkbox" 
                  required
                  class="mt-1"
                >
                <label class="text-sm text-gray-600">
                  I agree to the loan <NuxtLink to="/terms-conditions" class="text-primary hover:underline">Terms and Conditions</NuxtLink> 
                  and authorize Innovative Finance to process this application and verify the information provided.
                </label>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6 border-t">
              <Button 
                type="button"
                @click="previousStep" 
                variant="outline"
                size="lg"
              >
                Back to Edit
              </Button>
              <Button 
                @click="submitApplication"
                :disabled="!application.agreeToTerms || isSubmitting"
                size="lg"
              >
                <span v-if="isSubmitting">Submitting...</span>
                <span v-else>Submit Application</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div> <!-- End of authenticated user content -->
  </div> <!-- End of main container -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  Briefcase, 
  User, 
  Wheat, 
  AlertCircle, 
  UserCheck,
  FileText,
  Upload,
  FileCheck,
  X,
  Car,
  GraduationCap,
  Home
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Apply for Loan - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Apply for a microfinance loan with Innovative Finance. Choose from business, personal, agricultural, or emergency loans with competitive rates.'
    }
  ]
})

const currentStep = ref(1)
const selectedLoanType = ref('')
const isSubmitting = ref(false)

// Get loan type from URL parameters
const route = useRoute()
const loanTypeFromQuery = route.query.type

// Pre-select loan type if provided in URL
onMounted(() => {
  if (loanTypeFromQuery && ['business', 'personal', 'agricultural', 'emergency', 'auto', 'education', 'equipment', 'home', 'housing', 'group'].includes(loanTypeFromQuery)) {
    selectedLoanType.value = loanTypeFromQuery
  }
})

const application = ref({
  amount: '',
  term: '',
  purpose: '',
  employer: '',
  businessName: '',
  monthlyIncome: '',
  agreeToTerms: false,
  documents: {
    incomeVerification: null,
    businessRegistration: null,
    bankStatement: null
  }
})

const selectLoanType = (type) => {
  selectedLoanType.value = type
}

const nextStep = () => {
  if (currentStep.value === 2) {
    // Validate documents before proceeding to step 3
    if (!validateDocuments()) {
      return
    }
  }
  
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Document upload handlers
const handleIncomeDocUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
    application.value.documents.incomeVerification = file
  } else {
    alert('File size must be less than 5MB')
    event.target.value = ''
  }
}

const handleBusinessDocUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
    application.value.documents.businessRegistration = file
  } else {
    alert('File size must be less than 5MB')
    event.target.value = ''
  }
}

const handleBankStatementUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
    application.value.documents.bankStatement = file
  } else {
    alert('File size must be less than 5MB')
    event.target.value = ''
  }
}

const removeLoanDocument = (documentType) => {
  application.value.documents[documentType] = null
}

const validateDocuments = () => {
  if (!application.value.documents.bankStatement) {
    alert('Please upload your bank statement')
    return false
  }
  
  if (selectedLoanType.value === 'business' && !application.value.documents.businessRegistration) {
    alert('Please upload your business registration certificate')
    return false
  }
  
  if (selectedLoanType.value !== 'business' && !application.value.documents.incomeVerification) {
    alert('Please upload your income verification document')
    return false
  }
  
  return true
}

const getLoanLimits = () => {
  const limits = {
    business: { min: 1000, max: 100000 },
    personal: { min: 500, max: 50000 },
    agricultural: { min: 2000, max: 200000 },
    emergency: { min: 200, max: 10000 },
    auto: { min: 5000, max: 150000 },
    education: { min: 1000, max: 50000 },
    equipment: { min: 2000, max: 80000 },
    home: { min: 50000, max: 500000 },
    housing: { min: 5000, max: 100000 },
    group: { min: 500, max: 20000 }
  }
  return limits[selectedLoanType.value] || { min: 0, max: 0 }
}

const calculateMonthlyPayment = () => {
  const amount = parseInt(application.value.amount) || 0
  const term = parseInt(application.value.term) || 1
  const interestRate = 0.15 // 15% annual interest rate
  const monthlyRate = interestRate / 12
  
  if (amount > 0 && term > 0) {
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    return Math.round(payment)
  }
  return 0
}

const submitApplication = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    console.log('Loan application submitted:', {
      loanType: selectedLoanType.value,
      ...application.value,
      monthlyPayment: calculateMonthlyPayment()
    })
    
    // Show success message and redirect
    alert('Loan application submitted successfully! We will review your application and contact you within 2-3 business days.')
    
    // Reset form and redirect to account page
    navigateTo('/account')
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('There was an error submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>