<script setup lang="ts">
import type { LoanApplication, Customer } from '~/types/api'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const applicationId = route.params.id as string

// Fetch loan application
const { data: application, pending, refresh } = await useLoans().getLoanApplication(applicationId)

// Fetch customer details
const customerId = computed(() => application.value?.customer_id)
const { data: customer } = await useCustomers().getCustomer(customerId.value || '')

// Form state
const approvalForm = ref({
  approved_amount: 0,
  interest_rate: 15,
  tenure_months: 12,
  remarks: '',
})

const rejectionReason = ref('')
const showApproveDialog = ref(false)
const showRejectDialog = ref(false)
const actionLoading = ref(false)

// Initialize form with requested amount
watch(application, (app) => {
  if (app) {
    approvalForm.value.approved_amount = app.requested_amount
  }
}, { immediate: true })

// Approve loan
async function approveLoan() {
  if (!approvalForm.value.approved_amount || approvalForm.value.approved_amount <= 0) {
    alert('Please enter a valid approval amount')
    return
  }

  actionLoading.value = true
  try {
    await useLoans().approveLoan(applicationId, approvalForm.value)
    showApproveDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to approve loan:', error)
  } finally {
    actionLoading.value = false
  }
}

// Reject loan
async function rejectLoan() {
  if (!rejectionReason.value.trim()) {
    alert('Please provide a rejection reason')
    return
  }

  actionLoading.value = true
  try {
    await useLoans().rejectLoan(applicationId, rejectionReason.value)
    showRejectDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to reject loan:', error)
  } finally {
    actionLoading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

const calculateMonthlyPayment = () => {
  const { approved_amount, interest_rate, tenure_months } = approvalForm.value
  if (!approved_amount || !tenure_months) return 0

  const monthlyRate = interest_rate / 100 / 12
  const payment = (approved_amount * monthlyRate * Math.pow(1 + monthlyRate, tenure_months)) /
    (Math.pow(1 + monthlyRate, tenure_months) - 1)

  return payment
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved': return 'default'
    case 'pending': return 'secondary'
    case 'rejected': return 'destructive'
    case 'disbursed': return 'default'
    default: return 'outline'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-96">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Content -->
    <div v-else-if="application" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" @click="router.back()" class="mb-2">
            <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
          <h2 class="text-3xl font-bold tracking-tight">
            Loan Application Review
          </h2>
          <p class="text-muted-foreground">
            Application ID: {{ application.id }}
          </p>
        </div>
        <Badge :variant="getStatusVariant(application.status)" class="text-lg px-4 py-2">
          {{ application.status }}
        </Badge>
      </div>

      <!-- Action Buttons -->
      <div v-if="application.status === 'pending'" class="flex gap-2">
        <Button @click="showApproveDialog = true" variant="default">
          <Icon name="lucide:check-circle" class="mr-2 h-4 w-4" />
          Approve Loan
        </Button>
        <Button @click="showRejectDialog = true" variant="destructive">
          <Icon name="lucide:x-circle" class="mr-2 h-4 w-4" />
          Reject Loan
        </Button>
      </div>

      <!-- Main Content -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Loan Details -->
        <Card>
          <CardHeader>
            <CardTitle>Loan Request Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label class="text-muted-foreground">Requested Amount</Label>
              <p class="text-2xl font-bold">{{ formatCurrency(application.requested_amount) }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Purpose</Label>
              <p class="font-medium">{{ application.purpose }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Submitted Date</Label>
              <p class="font-medium">{{ new Date(application.created_at).toLocaleString() }}</p>
            </div>
            <div v-if="application.rejection_reason">
              <Label class="text-muted-foreground">Rejection Reason</Label>
              <Alert variant="destructive" class="mt-2">
                <AlertDescription>{{ application.rejection_reason }}</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <!-- Customer 360 View Link -->
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-if="customer">
              <Label class="text-muted-foreground">Full Name</Label>
              <p class="font-medium">{{ customer.first_name }} {{ customer.last_name }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Customer ID</Label>
              <p class="font-mono text-sm">{{ application.customer_id }}</p>
            </div>
            <div v-if="customer">
              <Label class="text-muted-foreground">Email</Label>
              <p class="font-medium">{{ customer.email }}</p>
            </div>
            <div v-if="customer">
              <Label class="text-muted-foreground">Phone</Label>
              <p class="font-medium">{{ customer.phone }}</p>
            </div>
            <Button variant="outline" class="w-full" as-child>
              <NuxtLink :to="`/admin/customers/${application.customer_id}`">
                <Icon name="lucide:external-link" class="mr-2 h-4 w-4" />
                View Customer 360° Profile
              </NuxtLink>
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- Credit Assessment -->
      <Card v-if="customer">
        <CardHeader>
          <CardTitle>Credit Assessment</CardTitle>
          <CardDescription>Key metrics for loan decision</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="border rounded-lg p-4">
              <Label class="text-xs text-muted-foreground">Account Balance</Label>
              <p class="text-xl font-bold mt-1">{{ formatCurrency(customer.account_balance) }}</p>
            </div>
            <div class="border rounded-lg p-4">
              <Label class="text-xs text-muted-foreground">Customer Since</Label>
              <p class="text-xl font-bold mt-1">{{ new Date(customer.created_at).getFullYear() }}</p>
            </div>
            <div class="border rounded-lg p-4">
              <Label class="text-xs text-muted-foreground">Credit Score</Label>
              <p class="text-xl font-bold mt-1 text-green-600">Good</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Approve Dialog -->
    <Dialog v-model:open="showApproveDialog">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Approve Loan Application</DialogTitle>
          <DialogDescription>
            Set the final loan terms and approve the application.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>Approved Amount (GHS) *</Label>
              <Input
                v-model.number="approvalForm.approved_amount"
                type="number"
                min="0"
                step="100"
              />
            </div>
            <div class="space-y-2">
              <Label>Interest Rate (%) *</Label>
              <Input
                v-model.number="approvalForm.interest_rate"
                type="number"
                min="0"
                max="100"
                step="0.5"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label>Tenure (Months) *</Label>
            <Select v-model="approvalForm.tenure_months">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="6">6 months</SelectItem>
                <SelectItem :value="12">12 months</SelectItem>
                <SelectItem :value="18">18 months</SelectItem>
                <SelectItem :value="24">24 months</SelectItem>
                <SelectItem :value="36">36 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Remarks (Optional)</Label>
            <Textarea
              v-model="approvalForm.remarks"
              placeholder="Add any approval notes..."
              rows="3"
            />
          </div>
          <Alert>
            <Icon name="lucide:info" class="h-4 w-4" />
            <AlertTitle>Estimated Monthly Payment</AlertTitle>
            <AlertDescription class="text-xl font-bold">
              {{ formatCurrency(calculateMonthlyPayment()) }}
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showApproveDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="approveLoan" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Approve & Disburse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Reject Dialog -->
    <Dialog v-model:open="showRejectDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Loan Application</DialogTitle>
          <DialogDescription>
            Please provide a clear reason for rejecting this loan application.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Rejection Reason *</Label>
            <Textarea
              v-model="rejectionReason"
              placeholder="Enter detailed rejection reason..."
              rows="4"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showRejectDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button variant="destructive" @click="rejectLoan" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
