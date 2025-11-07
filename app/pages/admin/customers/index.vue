<script setup lang="ts">
import type { Customer } from '~/types/api'

definePageMeta({ layout: 'admin' })

// Fetch customers
const { data: customers, pending, refresh } = await useCustomers().getCustomers()

// State
const searchQuery = ref('')
const showCreateDialog = ref(false)
const showDeleteDialog = ref(false)
const actionLoading = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const filterType = ref<'all' | 'individual' | 'business'>('all')

// Create form
const createForm = ref({
  type: 'individual' as 'individual' | 'business',
  // common
  email: '',
  phone: '',
  address: '',
  // individual
  first_name: '',
  last_name: '',
  national_id: '',
  // business
  business_name: '',
  registration_number: '',
  tax_id: '',
})

// Computed
const filteredCustomers = computed(() => {
  if (!customers.value) return []
  
  let filtered = customers.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((c: Customer) => {
      const nameMatch = `${c.first_name ?? ''} ${c.last_name ?? ''}`.toLowerCase().includes(query)
      const businessMatch = (c.business_name ?? '').toLowerCase().includes(query)
      const emailMatch = (c.email ?? '').toLowerCase().includes(query)
      const phoneMatch = (c.phone ?? '').toLowerCase().includes(query)
      const idMatch = (c.national_id ?? '').toLowerCase().includes(query)
      const regMatch = (c.registration_number ?? '').toLowerCase().includes(query)
      const accountMatch = (c.account_number ?? '').toLowerCase().includes(query)
      return nameMatch || businessMatch || emailMatch || phoneMatch || idMatch || regMatch || accountMatch
    })
  }

  // Type filter
  if (filterType.value !== 'all') {
    filtered = filtered.filter((c: Customer) => c.type === filterType.value)
  }

  return filtered
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

function openCreateDialog() {
  createForm.value = {
    type: 'individual',
    email: '',
    phone: '',
    address: '',
    first_name: '',
    last_name: '',
    national_id: '',
    business_name: '',
    registration_number: '',
    tax_id: '',
  }
  showCreateDialog.value = true
}

function openDeleteDialog(customer: Customer) {
  selectedCustomer.value = customer
  showDeleteDialog.value = true
}

async function createCustomer() {
  actionLoading.value = true
  try {
    // Minimal validation by type
    if (createForm.value.type === 'individual') {
      if (!createForm.value.first_name || !createForm.value.last_name || !createForm.value.national_id) {
        alert('First name, Last name and National ID are required for Individual customers.')
        actionLoading.value = false
        return
      }
    } else {
      if (!createForm.value.business_name || !createForm.value.registration_number) {
        alert('Business Name and Registration Number are required for Business customers.')
        actionLoading.value = false
        return
      }
    }
    if (!createForm.value.email || !createForm.value.phone) {
      alert('Email and Phone are required.')
      actionLoading.value = false
      return
    }
    const payload: any = {
      type: createForm.value.type,
      email: createForm.value.email,
      phone: createForm.value.phone,
      address: createForm.value.address,
    }
    if (createForm.value.type === 'individual') {
      payload.first_name = createForm.value.first_name
      payload.last_name = createForm.value.last_name
      payload.national_id = createForm.value.national_id
    } else {
      payload.business_name = createForm.value.business_name
      payload.registration_number = createForm.value.registration_number
      payload.tax_id = createForm.value.tax_id
    }
    await useCustomers().createCustomer(payload)
    showCreateDialog.value = false
    await refresh()
  } catch (e) {
    console.error('Failed to create customer', e)
  } finally {
    actionLoading.value = false
  }
}

async function deleteCustomer() {
  if (!selectedCustomer.value) return
  actionLoading.value = true
  try {
    await useCustomers().deleteCustomer(selectedCustomer.value.id)
    showDeleteDialog.value = false
    selectedCustomer.value = null
    await refresh()
  } catch (e) {
    console.error('Failed to delete customer', e)
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Customers</h2>
        <p class="text-muted-foreground">
          Manage customer accounts and view 360° profiles
        </p>
      </div>
      <Button @click="openCreateDialog">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Customers</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ customers?.length || 0 }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Balance</CardTitle>
          <Icon name="lucide:wallet" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formatCurrency(customers?.reduce((sum: number, c: Customer) => sum + c.account_balance, 0) || 0) }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Active Accounts</CardTitle>
          <Icon name="lucide:check-circle" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ customers?.length || 0 }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Search & Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="md:col-span-2">
            <Input
              v-model="searchQuery"
              placeholder="Search by name, email, phone, ID..."
              class="w-full"
            >
              <template #prefix>
                <Icon name="lucide:search" class="h-4 w-4" />
              </template>
            </Input>
          </div>
          <div>
            <Label class="sr-only">Customer Type</Label>
            <Select v-model="filterType">
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-64">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Customers Table -->
    <Card v-else>
      <CardContent class="p-0">
        <Table v-if="filteredCustomers.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="customer in filteredCustomers" :key="customer.id">
              <TableCell>
                <div class="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {{ customer.type === 'individual' ? (customer.first_name?.[0] || 'C') + (customer.last_name?.[0] || '') : 'B' }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-medium">
                      <template v-if="customer.type === 'individual'">
                        {{ customer.first_name }} {{ customer.last_name }}
                      </template>
                      <template v-else>
                        {{ customer.business_name }}
                      </template>
                    </p>
                    <p class="text-xs text-muted-foreground">
                      <template v-if="customer.type === 'individual'">ID: {{ customer.national_id }}</template>
                      <template v-else>Reg: {{ customer.registration_number }}</template>
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ customer.email }}</TableCell>
              <TableCell>{{ customer.phone }}</TableCell>
              <TableCell class="font-mono text-sm">{{ customer.account_number }}</TableCell>
              <TableCell class="font-semibold">
                {{ formatCurrency(customer.account_balance) }}
              </TableCell>
              <TableCell>{{ new Date(customer.created_at).toLocaleDateString() }}</TableCell>
              <TableCell>
                <Badge :variant="customer.type === 'business' ? 'secondary' : 'outline'" class="capitalize">
                  {{ customer.type }}
                </Badge>
              </TableCell>
              <TableCell>
                <NuxtLink :to="`/admin/customers/${customer.id}`">
                  <Button size="sm" variant="ghost">
                    <Icon name="lucide:eye" class="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </NuxtLink>
                <Button size="sm" variant="ghost" class="text-destructive" @click="openDeleteDialog(customer)">
                  <Icon name="lucide:trash-2" class="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-else class="p-8 text-center">
          <Icon name="lucide:users" class="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-lg font-semibold">No customers found</h3>
          <p class="text-sm text-muted-foreground">
            {{ searchQuery ? 'Try adjusting your search criteria' : 'Get started by onboarding your first customer' }}
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Create Customer Dialog -->
    <Dialog v-model:open="showCreateDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogDescription>
          Create a new customer record. Choose customer type to reveal relevant fields.
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <Label>Customer Type *</Label>
          <Select v-model="createForm.type">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div v-if="createForm.type === 'individual'" class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label>First Name *</Label>
            <Input v-model="createForm.first_name" />
          </div>
          <div class="space-y-2">
            <Label>Last Name *</Label>
            <Input v-model="createForm.last_name" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <Label>National ID *</Label>
            <Input v-model="createForm.national_id" />
          </div>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2 md:col-span-2">
            <Label>Business Name *</Label>
            <Input v-model="createForm.business_name" />
          </div>
          <div class="space-y-2">
            <Label>Registration Number *</Label>
            <Input v-model="createForm.registration_number" />
          </div>
          <div class="space-y-2">
            <Label>Tax ID</Label>
            <Input v-model="createForm.tax_id" />
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label>Email *</Label>
            <Input v-model="createForm.email" type="email" />
          </div>
          <div class="space-y-2">
            <Label>Phone *</Label>
            <Input v-model="createForm.phone" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <Textarea v-model="createForm.address" rows="2" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="showCreateDialog = false" :disabled="actionLoading">
          Cancel
        </Button>
        <Button @click="createCustomer" :disabled="actionLoading">
          <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          Create Customer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Delete Customer Dialog -->
  <Dialog v-model:open="showDeleteDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogDescription>
          This action will permanently delete the customer record.
        </DialogDescription>
      </DialogHeader>
      <div class="py-4">
        <Alert variant="destructive">
          <Icon name="lucide:alert-triangle" class="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete
            <strong>
              {{ selectedCustomer?.type === 'business' ? selectedCustomer?.business_name : `${selectedCustomer?.first_name} ${selectedCustomer?.last_name}` }}
            </strong>?
          </AlertDescription>
        </Alert>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="showDeleteDialog = false" :disabled="actionLoading">
          Cancel
        </Button>
        <Button variant="destructive" @click="deleteCustomer" :disabled="actionLoading">
          <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>
</template>
