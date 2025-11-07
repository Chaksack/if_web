<script setup lang="ts">
import type { Transaction } from '~/types/api'

definePageMeta({ layout: 'admin' })

// Fetch transactions
const { data: transactions, pending, refresh } = await useTransactions().getTransactions({})

// State
const searchQuery = ref('')
const filterType = ref<string>('all')
const filterChannel = ref<string>('all')
const filterStatus = ref<string>('all')
const showFlagged = ref(false)
const selectedTransaction = ref<Transaction | null>(null)
const showFlagDialog = ref(false)
const showNoteDialog = ref(false)
const flagReason = ref('')
const noteText = ref('')
const actionLoading = ref(false)

// Computed
const filteredTransactions = computed(() => {
  if (!transactions.value) return []
  
  let filtered = transactions.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((t: Transaction) =>
      t.reference.toLowerCase().includes(query) ||
      t.customer_id.toString().includes(query)
    )
  }

  // Type filter
  if (filterType.value !== 'all') {
    filtered = filtered.filter((t: Transaction) => t.type === filterType.value)
  }

  // Channel filter
  if (filterChannel.value !== 'all') {
    filtered = filtered.filter((t: Transaction) => t.channel === filterChannel.value)
  }

  // Status filter
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter((t: Transaction) => t.status === filterStatus.value)
  }

  // Flagged filter
  if (showFlagged.value) {
    filtered = filtered.filter((t: Transaction) => t.is_flagged)
  }

  return filtered
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed': return 'default'
    case 'pending': return 'secondary'
    case 'failed': return 'destructive'
    case 'cancelled': return 'outline'
    default: return 'outline'
  }
}

const getTypeVariant = (type: string) => {
  switch (type) {
    case 'deposit': return 'default'
    case 'withdrawal': return 'destructive'
    case 'loan_repayment': return 'secondary'
    case 'loan_disbursement': return 'default'
    default: return 'outline'
  }
}

// Actions
function openFlagDialog(transaction: Transaction) {
  selectedTransaction.value = transaction
  flagReason.value = ''
  showFlagDialog.value = true
}

function openNoteDialog(transaction: Transaction) {
  selectedTransaction.value = transaction
  noteText.value = ''
  showNoteDialog.value = true
}

async function flagTransaction() {
  if (!selectedTransaction.value || !flagReason.value) return
  
  actionLoading.value = true
  try {
    await useTransactions().flagTransaction(selectedTransaction.value.id, flagReason.value)
    showFlagDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to flag transaction:', error)
  } finally {
    actionLoading.value = false
  }
}

async function unflagTransaction(transactionId: string) {
  actionLoading.value = true
  try {
    await useTransactions().unflagTransaction(transactionId)
    await refresh()
  } catch (error) {
    console.error('Failed to unflag transaction:', error)
  } finally {
    actionLoading.value = false
  }
}

async function addNote() {
  if (!selectedTransaction.value || !noteText.value) return
  
  actionLoading.value = true
  try {
    await useTransactions().addTransactionNote(selectedTransaction.value.id, noteText.value)
    showNoteDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to add note:', error)
  } finally {
    actionLoading.value = false
  }
}

async function resolveTransaction(transactionId: string) {
  actionLoading.value = true
  try {
    await useTransactions().resolveTransaction(transactionId, 'Resolved by admin')
    await refresh()
  } catch (error) {
    console.error('Failed to resolve transaction:', error)
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Transaction Management</h2>
      <p class="text-muted-foreground">
        Monitor all transactions and flag suspicious activity
      </p>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
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
          <CardTitle class="text-sm font-medium">Total Volume</CardTitle>
          <Icon name="lucide:banknote" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formatCurrency(transactions?.reduce((sum: number, t: Transaction) => sum + t.amount, 0) || 0) }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Flagged</CardTitle>
          <Icon name="lucide:flag" class="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ transactions?.filter((t: Transaction) => t.is_flagged).length || 0 }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Pending</CardTitle>
          <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ transactions?.filter((t: Transaction) => t.status === 'pending').length || 0 }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Filter Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Input
              v-model="searchQuery"
              placeholder="Search reference, customer ID..."
            >
              <template #prefix>
                <Icon name="lucide:search" class="h-4 w-4" />
              </template>
            </Input>
          </div>
          <Select v-model="filterType">
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="loan_repayment">Loan Repayment</SelectItem>
              <SelectItem value="loan_disbursement">Loan Disbursement</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="filterChannel">
            <SelectTrigger>
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="mobile_money">Mobile Money</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="ussd">USSD</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="filterStatus">
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div class="flex items-center space-x-2">
            <input
              id="showFlagged"
              v-model="showFlagged"
              type="checkbox"
              class="h-4 w-4"
            />
            <label for="showFlagged" class="text-sm font-medium cursor-pointer">
              Show Flagged Only
            </label>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-64">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Transactions Table -->
    <Card v-else>
      <CardContent class="p-0">
        <Table v-if="filteredTransactions.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              :class="{ 'bg-destructive/5': transaction.is_flagged }"
            >
              <TableCell>
                {{ new Date(transaction.created_at).toLocaleString() }}
              </TableCell>
              <TableCell class="font-mono text-xs">
                <div class="flex items-center gap-1">
                  {{ transaction.reference }}
                  <Icon
                    v-if="transaction.is_flagged"
                    name="lucide:flag"
                    class="h-3 w-3 text-destructive"
                  />
                </div>
              </TableCell>
              <TableCell>
                <NuxtLink
                  :to="`/admin/customers/${transaction.customer_id}`"
                  class="text-primary hover:underline"
                >
                  {{ transaction.customer_id }}
                </NuxtLink>
              </TableCell>
              <TableCell>
                <Badge :variant="getTypeVariant(transaction.type)">
                  {{ transaction.type.replace('_', ' ') }}
                </Badge>
              </TableCell>
              <TableCell class="capitalize">{{ transaction.channel }}</TableCell>
              <TableCell class="font-semibold">
                {{ formatCurrency(transaction.amount) }}
              </TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(transaction.status)">
                  {{ transaction.status }}
                </Badge>
              </TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <Button
                    v-if="!transaction.is_flagged"
                    size="sm"
                    variant="ghost"
                    @click="openFlagDialog(transaction)"
                  >
                    <Icon name="lucide:flag" class="h-4 w-4" />
                  </Button>
                  <Button
                    v-else
                    size="sm"
                    variant="ghost"
                    @click="unflagTransaction(transaction.id)"
                    :disabled="actionLoading"
                  >
                    <Icon name="lucide:check" class="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="openNoteDialog(transaction)"
                  >
                    <Icon name="lucide:message-square" class="h-4 w-4" />
                  </Button>
                  <Button
                    v-if="transaction.is_flagged && transaction.status === 'pending'"
                    size="sm"
                    variant="ghost"
                    @click="resolveTransaction(transaction.id)"
                    :disabled="actionLoading"
                  >
                    <Icon name="lucide:check-circle" class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-else class="p-8 text-center">
          <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-lg font-semibold">No transactions found</h3>
          <p class="text-sm text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Flag Transaction Dialog -->
    <Dialog v-model:open="showFlagDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flag Transaction</DialogTitle>
          <DialogDescription>
            Flag this transaction for review. Provide a reason for flagging.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Transaction Reference</Label>
            <Input
              :value="selectedTransaction?.reference"
              readonly
              class="font-mono"
            />
          </div>
          <div class="space-y-2">
            <Label>Reason for Flagging *</Label>
            <Textarea
              v-model="flagReason"
              placeholder="e.g., Unusual transaction pattern, Exceeds daily limit..."
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showFlagDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="flagTransaction" :disabled="!flagReason || actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Flag Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Add Note Dialog -->
    <Dialog v-model:open="showNoteDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction Note</DialogTitle>
          <DialogDescription>
            Add a note to this transaction for internal record keeping.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Transaction Reference</Label>
            <Input
              :value="selectedTransaction?.reference"
              readonly
              class="font-mono"
            />
          </div>
          <div class="space-y-2">
            <Label>Note *</Label>
            <Textarea
              v-model="noteText"
              placeholder="Enter your note..."
              rows="4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showNoteDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="addNote" :disabled="!noteText || actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
