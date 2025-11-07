<script setup lang="ts">
import type { Customer, Transaction, Loan } from '~/types/api'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const customerId = route.params.id as string

// Fetch customer details
const { data: customer, pending, refresh } = await useCustomers().getCustomer(customerId) as { data: Ref<Customer>, pending: any, refresh: () => Promise<void> }

// Fetch customer transactions
const { data: transactions } = await useCustomers().getCustomerTransactions(customerId) as { data: Ref<Transaction[]> }

// Fetch customer loans
const { data: loans } = await useCustomers().getCustomerLoans(customerId) as { data: Ref<Loan[]> }

// State
const showEditDialog = ref(false)
const editForm = ref({
  type: 'individual' as 'individual' | 'business',
  // individual
  first_name: '',
  last_name: '',
  national_id: '',
  // business
  business_name: '',
  registration_number: '',
  tax_id: '',
  // common
  email: '',
  phone: '',
  address: '',
})

const editLoading = ref(false)
const activeTab = ref('overview')

// Initialize edit form
watch(customer, (cust) => {
  if (cust) {
    editForm.value = {
      type: cust.type,
      first_name: cust.first_name ?? '',
      last_name: cust.last_name ?? '',
      national_id: cust.national_id ?? '',
      business_name: cust.business_name ?? '',
      registration_number: cust.registration_number ?? '',
      tax_id: cust.tax_id ?? '',
      email: cust.email ?? '',
      phone: cust.phone ?? '',
      address: cust.address ?? '',
    }
  }
}, { immediate: true })

// Update customer
async function updateCustomer() {
  editLoading.value = true
  try {
    const payload: any = {
      type: editForm.value.type,
      email: editForm.value.email,
      phone: editForm.value.phone,
      address: editForm.value.address,
    }
    if (editForm.value.type === 'individual') {
      payload.first_name = editForm.value.first_name
      payload.last_name = editForm.value.last_name
      payload.national_id = editForm.value.national_id
      payload.business_name = null
      payload.registration_number = null
      payload.tax_id = null
    } else {
      payload.business_name = editForm.value.business_name
      payload.registration_number = editForm.value.registration_number
      payload.tax_id = editForm.value.tax_id
      payload.first_name = null
      payload.last_name = null
      payload.national_id = null
    }
    await useCustomers().updateCustomer(customerId, payload)
    showEditDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to update customer:', error)
  } finally {
    editLoading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

const getTransactionTypeVariant = (type: string) => {
  switch (type) {
    case 'deposit': return 'default'
    case 'withdrawal': return 'destructive'
    case 'loan_repayment': return 'secondary'
    case 'loan_disbursement': return 'default'
    default: return 'outline'
  }
}

const getLoanStatusVariant = (status: string) => {
  switch (status) {
    case 'active': return 'default'
    case 'overdue': return 'destructive'
    case 'paid': return 'secondary'
    case 'defaulted': return 'destructive'
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
    <div v-else-if="customer" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">
            <template v-if="customer.type === 'individual'">{{ customer.first_name }} {{ customer.last_name }}</template>
            <template v-else>{{ customer.business_name }}</template>
          </h2>
          <p class="text-muted-foreground">
            Customer ID: {{ customer.id }}
          </p>
        </div>
        <Button @click="showEditDialog = true">
          <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <!-- Key Metrics -->
      <div class="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">Account Balance</CardTitle>
            <Icon name="lucide:wallet" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ formatCurrency(customer.account_balance) }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">Total Transactions</CardTitle>
            <Icon name="lucide:arrow-left-right" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ transactions?.length || 0 }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">Active Loans</CardTitle>
            <Icon name="lucide:file-text" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ loans?.filter((l: Loan) => l.status === 'active').length || 0 }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">Customer Since</CardTitle>
            <Icon name="lucide:calendar" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ new Date(customer.created_at).getFullYear() }}</div>
          </CardContent>
        </Card>
      </div>

      <!-- Tabs -->
      <Card>
        <CardHeader>
          <div class="flex gap-2">
            <Button
              :variant="activeTab === 'overview' ? 'default' : 'ghost'"
              size="sm"
              @click="activeTab = 'overview'"
            >
              Overview
            </Button>
            <Button
              :variant="activeTab === 'transactions' ? 'default' : 'ghost'"
              size="sm"
              @click="activeTab = 'transactions'"
            >
              Transactions
            </Button>
            <Button
              :variant="activeTab === 'loans' ? 'default' : 'ghost'"
              size="sm"
              @click="activeTab = 'loans'"
            >
              Loans
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div class="grid gap-6 md:grid-cols-2">
              <!-- Personal Information -->
              <div class="space-y-4">
                <h3 class="font-semibold text-lg">Personal Information</h3>
                <div class="space-y-3">
                  <div>
                    <Label class="text-muted-foreground">Customer Type</Label>
                    <p class="font-medium capitalize">{{ customer.type }}</p>
                  </div>
                  <div v-if="customer.type === 'individual'">
                    <Label class="text-muted-foreground">Full Name</Label>
                    <p class="font-medium">{{ customer.first_name }} {{ customer.last_name }}</p>
                  </div>
                  <div v-else>
                    <Label class="text-muted-foreground">Business Name</Label>
                    <p class="font-medium">{{ customer.business_name }}</p>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Email</Label>
                    <p class="font-medium">{{ customer.email }}</p>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Phone</Label>
                    <p class="font-medium">{{ customer.phone }}</p>
                  </div>
                  <div v-if="customer.type === 'individual'">
                    <Label class="text-muted-foreground">National ID</Label>
                    <p class="font-mono text-sm">{{ customer.national_id }}</p>
                  </div>
                  <div v-else class="space-y-2">
                    <div>
                      <Label class="text-muted-foreground">Registration Number</Label>
                      <p class="font-mono text-sm">{{ customer.registration_number }}</p>
                    </div>
                    <div>
                      <Label class="text-muted-foreground">Tax ID</Label>
                      <p class="font-mono text-sm">{{ customer.tax_id || '-' }}</p>
                    </div>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Address</Label>
                    <p class="font-medium">{{ customer.address }}</p>
                  </div>
                </div>
              </div>

              <!-- Account Information -->
              <div class="space-y-4">
                <h3 class="font-semibold text-lg">Account Information</h3>
                <div class="space-y-3">
                  <div>
                    <Label class="text-muted-foreground">Account Number</Label>
                    <p class="font-mono font-medium">{{ customer.account_number }}</p>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Account Balance</Label>
                    <p class="text-xl font-bold">{{ formatCurrency(customer.account_balance) }}</p>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Opened Date</Label>
                    <p class="font-medium">{{ new Date(customer.created_at).toLocaleDateString() }}</p>
                  </div>
                  <div>
                    <Label class="text-muted-foreground">Last Updated</Label>
                    <p class="font-medium">{{ new Date(customer.updated_at).toLocaleDateString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Transactions Tab -->
          <div v-if="activeTab === 'transactions'">
            <Table v-if="transactions && transactions.length > 0">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="transaction in transactions" :key="transaction.id">
                  <TableCell>
                    {{ new Date(transaction.created_at).toLocaleString() }}
                  </TableCell>
                  <TableCell>
                    <Badge :variant="getTransactionTypeVariant(transaction.type)">
                      {{ transaction.type.replace('_', ' ') }}
                    </Badge>
                  </TableCell>
                  <TableCell class="capitalize">{{ transaction.channel }}</TableCell>
                  <TableCell class="font-semibold">
                    {{ formatCurrency(transaction.amount) }}
                  </TableCell>
                  <TableCell class="capitalize">{{ transaction.status }}</TableCell>
                  <TableCell class="font-mono text-xs">{{ transaction.reference }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div v-else class="p-8 text-center">
              <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
              <p class="mt-2 text-sm text-muted-foreground">No transactions found</p>
            </div>
          </div>

          <!-- Loans Tab -->
          <div v-if="activeTab === 'loans'">
            <Table v-if="loans && loans.length > 0">
              <TableHeader>
                <TableRow>
                  <TableHead>Disbursement Date</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Outstanding Balance</TableHead>
                  <TableHead>Monthly Payment</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="loan in loans" :key="loan.id">
                  <TableCell>
                    {{ new Date(loan.disbursement_date).toLocaleDateString() }}
                  </TableCell>
                  <TableCell class="font-semibold">
                    {{ formatCurrency(loan.principal_amount) }}
                  </TableCell>
                  <TableCell>{{ loan.interest_rate }}%</TableCell>
                  <TableCell class="font-semibold">
                    {{ formatCurrency(loan.outstanding_balance) }}
                  </TableCell>
                  <TableCell>{{ formatCurrency(loan.monthly_payment) }}</TableCell>
                  <TableCell>
                    {{ new Date(loan.next_payment_date).toLocaleDateString() }}
                  </TableCell>
                  <TableCell>
                    <Badge :variant="getLoanStatusVariant(loan.status)">
                      {{ loan.status }}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div v-else class="p-8 text-center">
              <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
              <p class="mt-2 text-sm text-muted-foreground">No loans found</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Edit Customer Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer Profile</DialogTitle>
          <DialogDescription>
            Update customer information. Changes will be logged for audit.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Customer Type *</Label>
            <Select v-model="editForm.type">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div v-if="editForm.type === 'individual'" class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>First Name *</Label>
              <Input v-model="editForm.first_name" />
            </div>
            <div class="space-y-2">
              <Label>Last Name *</Label>
              <Input v-model="editForm.last_name" />
            </div>
            <div class="space-y-2 md:col-span-2">
              <Label>National ID *</Label>
              <Input v-model="editForm.national_id" />
            </div>
          </div>
          <div v-else class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2 md:col-span-2">
              <Label>Business Name *</Label>
              <Input v-model="editForm.business_name" />
            </div>
            <div class="space-y-2">
              <Label>Registration Number *</Label>
              <Input v-model="editForm.registration_number" />
            </div>
            <div class="space-y-2">
              <Label>Tax ID</Label>
              <Input v-model="editForm.tax_id" />
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>Email *</Label>
              <Input v-model="editForm.email" type="email" />
            </div>
            <div class="space-y-2">
              <Label>Phone *</Label>
              <Input v-model="editForm.phone" />
            </div>
            <div class="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Textarea v-model="editForm.address" rows="2" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showEditDialog = false" :disabled="editLoading">
            Cancel
          </Button>
          <Button @click="updateCustomer" :disabled="editLoading">
            <Icon v-if="editLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
