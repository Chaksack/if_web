<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">My Account</h1>
          <p class="text-xl text-gray-600">Manage your profile and loan applications.</p>
        </div>
      </div>
    </div>

    <div class="py-12">
      <div class="mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside class="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{{ userInitials }}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="text-lg font-semibold">{{ user?.name || 'Guest' }}</div>
                      <div class="text-sm text-gray-500">{{ user?.email || '' }}</div>
                    </div>
                  </div>

                  <div class="mt-6 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Available balance</div>
                      <div class="font-medium">GHS {{ balance }}</div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Recent transactions</div>
                      <div class="font-medium">{{ transactions.length }}</div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Active loans</div>
                      <div class="font-medium">{{ loans.length }}</div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <BalanceChart :transactions="transactions" />
                  </div>

                  <div class="mt-6 flex gap-2">
                    <RouterLink to="/account/settings" class="w-full inline-block">
                      <Button variant="outline" class="w-full">Edit profile</Button>
                    </RouterLink>
                    <button @click="goToApply" class="w-full inline-block">
                      <Button class="w-full">Apply loan</Button>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </aside>
            <main class="lg:col-span-3 space-y-6">
              <div class="bg-white p-4 rounded shadow flex items-center justify-between">
                <div>
                  <div class="text-sm text-gray-500">Account</div>
                  <div class="text-xl font-semibold">{{ customer?.account_number || '—' }}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-500">Available balance</div>
                  <div class="text-3xl font-bold">GHS {{ balance }}</div>
                </div>
                <div class="flex gap-2">
                  <button @click="goToApply" class="px-4 py-2 bg-primary text-white rounded">Apply loan</button>
                  <button @click="exportStatement" class="px-4 py-2 border rounded">Download statement</button>
                  <button @click="showTransfer = !showTransfer" class="px-4 py-2 border rounded">Transfer</button>
                </div>
              </div>

              <div v-if="showTransfer" class="mt-4">
                <TransferForm @completed="onTransferCompleted" @cancel="showTransfer=false" />
              </div>

              <div class="bg-white p-6 rounded shadow">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold">Transactions</h3>
                  <div class="text-sm text-gray-500">Quick filters</div>
                </div>
              <div class="bg-white p-6 rounded shadow">
                <h3 class="font-semibold mb-4">Recent activity</h3>
                <div class="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
                  <div>
                    <label class="text-sm text-gray-500">Type</label>
                    <select v-model="filter.type" class="w-full mt-1 input">
                      <option value="">All</option>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="loan_repayment">Loan repayment</option>
                      <option value="loan_disbursement">Loan disbursement</option>
                    </select>
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Channel</label>
                    <select v-model="filter.channel" class="w-full mt-1 input">
                      <option value="">All</option>
                      <option value="mobile_money">Mobile money</option>
                      <option value="bank">Bank</option>
                      <option value="cash">Cash</option>
                      <option value="ussd">USSD</option>
                    </select>
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Status</label>
                    <select v-model="filter.status" class="w-full mt-1 input">
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                  <div>
                    <label class="text-sm text-gray-500">From</label>
                    <input v-model="filter.start_date" type="date" class="w-full mt-1 input" />
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">To</label>
                    <input v-model="filter.end_date" type="date" class="w-full mt-1 input" />
                  </div>
                  <div class="flex gap-2">
                    <button @click="fetchTransactions(1)" class="px-4 py-2 bg-primary text-white rounded">Apply</button>
                    <button @click="{ filter.type=''; filter.channel=''; filter.status=''; filter.start_date=''; filter.end_date=''; fetchTransactions(1) }" class="px-4 py-2 bg-gray-100 rounded">Clear</button>
                  </div>
                </div>

                <div v-if="loading" class="text-sm text-gray-500">Loading...</div>
                <div v-else-if="transactions.length === 0" class="text-sm text-gray-500">No recent transactions</div>
                <div v-else class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="text-sm text-gray-500">
                        <th class="py-2">Date</th>
                        <th class="py-2">Type</th>
                        <th class="py-2">Channel</th>
                        <th class="py-2">Amount (GHS)</th>
                        <th class="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="t in transactions" :key="t.id" class="border-t hover:bg-gray-50 cursor-pointer" @click="openTransaction(t)">
                        <td class="py-3 text-sm text-gray-500">{{ formatDate(t.created_at) }}</td>
                        <td class="py-3">{{ t.type }}</td>
                        <td class="py-3">{{ t.channel }}</td>
                        <td class="py-3">{{ t.amount }}</td>
                        <td class="py-3"><span :class="t.status === 'completed' ? 'text-green-600' : t.status === 'failed' ? 'text-red-600' : 'text-yellow-600'">{{ t.status }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-sm text-gray-500">Page {{ page }} of {{ totalPages }}</div>
                  <div class="flex items-center gap-2">
                    <button :disabled="page <= 1" @click="prevPage" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                    <input type="number" v-model.number="page" min="1" :max="totalPages" class="w-20 input" @change="fetchTransactions(page)" />
                    <button :disabled="page >= totalPages" @click="nextPage" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded shadow">
                <h3 class="font-semibold mb-4">Loans</h3>
                <div v-if="loans.length === 0" class="text-sm text-gray-500">You have no active loans.</div>
                <div v-else class="grid grid-cols-1 gap-4">
                  <div v-for="l in loans" :key="l.id" class="p-4 border rounded">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Principal: GHS {{ l.principal_amount }}</div>
                        <div class="text-sm text-gray-500">Status: <span :class="l.status === 'active' ? 'text-green-600' : l.status === 'overdue' ? 'text-red-600' : 'text-gray-600'">{{ l.status }}</span></div>
                      </div>
                      <div class="text-right text-sm text-gray-500">
                        <div>Outstanding: GHS {{ l.outstanding_balance }}</div>
                        <div>Next due: {{ formatDate(l.next_payment_date) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded shadow">
                <h3 class="font-semibold mb-4">Loans</h3>
                <div v-if="loans.length === 0" class="text-sm text-gray-500">You have no active loans.</div>
                <div v-else class="grid grid-cols-1 gap-4">
                  <div v-for="l in loans" :key="l.id" class="p-4 border rounded">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Principal: GHS {{ l.principal_amount }}</div>
                        <div class="text-sm text-gray-500">Status: <span :class="l.status === 'active' ? 'text-green-600' : l.status === 'overdue' ? 'text-red-600' : 'text-gray-600'">{{ l.status }}</span></div>
                      </div>
                      <div class="text-right text-sm text-gray-500">
                        <div>Outstanding: GHS {{ l.outstanding_balance }}</div>
                        <div>Next due: {{ formatDate(l.next_payment_date) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
      </div>
    </div>
  </div>
  <TransactionModal v-if="showModal" :tx="selectedTransaction" @close="closeModal" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { useCustomers } from '~/composables/useCustomers'
import { useTransactions } from '~/composables/useTransactions'
import TransactionModal from '~/components/account/TransactionModal.vue'
import BalanceChart from '~/components/account/BalanceChart.vue'
import TransferForm from '~/components/account/TransferForm.vue'
import { toCSV, downloadCSV } from '~/utils/csv'
import { toast } from 'vue-sonner'
// composables used via customersApi for scoped customer endpoints

const router = useRouter()
const user = ref<any>(null)
const customer = ref<any | null>(null)
const transactions = ref<any[]>([])
const loans = ref<any[]>([])
const loading = ref(false)

const customersApi = useCustomers()
const txApi = useTransactions()

// UI state for pagination and filters
const page = ref(1)
const perPage = ref(10)
const totalPages = ref(1)
const filter = ref({ type: '', channel: '', status: '', start_date: '', end_date: '' })
const selectedTransaction = ref<any | null>(null)
const showModal = ref(false)
const showTransfer = ref(false)

function onTransferCompleted(newTx: any) {
  // optimistic: prepend to transactions and show toast
  if (newTx) transactions.value.unshift(newTx)
  toast.success('Transfer queued')
  showTransfer.value = false
}

async function fetchTransactions(p = 1) {
  const idForFetch = customer.value?.id
  if (!idForFetch) return
  loading.value = true
  page.value = p
  try {
    const params: any = {
      customer_id: idForFetch,
      page: p,
      per_page: perPage.value,
    }
    if (filter.value.type) params.type = filter.value.type
    if (filter.value.channel) params.channel = filter.value.channel
    if (filter.value.status) params.status = filter.value.status
    if (filter.value.start_date) params.start_date = filter.value.start_date
    if (filter.value.end_date) params.end_date = filter.value.end_date

    const res = await txApi.getTransactions(params)
    // support both plain array and paginated { data, meta }
    const maybe = (res as any).data || (await res).data
    if (!maybe) {
      transactions.value = []
      totalPages.value = 1
    } else if (Array.isArray(maybe)) {
      transactions.value = maybe
      totalPages.value = 1
    } else if (maybe.data) {
      transactions.value = maybe.data
      totalPages.value = maybe.meta?.last_page || Math.ceil((maybe.meta?.total || transactions.value.length) / perPage.value)
    } else {
      transactions.value = []
      totalPages.value = 1
    }
  } catch (e) {
    transactions.value = []
    totalPages.value = 1
  }
  loading.value = false
}

function openTransaction(tx: any) {
  selectedTransaction.value = tx
  showModal.value = true
}

function closeModal() {
  selectedTransaction.value = null
  showModal.value = false
}

async function exportStatement() {
  const idForFetch = customer.value?.id
  if (!idForFetch) {
    toast.error('No customer linked')
    return
  }
  try {
    const params: any = { customer_id: idForFetch, page: 1, per_page: 1000 }
    if (filter.value.start_date) params.start_date = filter.value.start_date
    if (filter.value.end_date) params.end_date = filter.value.end_date
    const res = await txApi.getTransactions(params)
    const maybe = (res as any).data || (await res).data || res
    const rows = Array.isArray(maybe) ? maybe : (maybe.data || [])
    if (!rows || rows.length === 0) {
      toast.error('No transactions for selected period')
      return
    }
    const csv = toCSV(rows, ['created_at','reference','type','channel','amount','status','notes'])
    downloadCSV(csv, `statement-${customer.value?.account_number || 'account'}.csv`)
    toast.success('Statement downloaded')
  } catch (e) {
    toast.error('Failed to download statement')
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value -= 1
    fetchTransactions(page.value)
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value += 1
    fetchTransactions(page.value)
  }
}

// Listen for updated transactions dispatched from modal and update list optimistically
import { onUnmounted } from 'vue'

function onWindowUpdated(e: any) {
  const updated = e?.detail
  if (!updated) return
  const idx = transactions.value.findIndex((x: any) => x.id === updated.id)
  if (idx >= 0) transactions.value.splice(idx, 1, updated)
}

if (typeof window !== 'undefined') {
  window.addEventListener('updated', onWindowUpdated as EventListener)
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('updated', onWindowUpdated as EventListener)
  }
})

onMounted(async () => {
  try { user.value = JSON.parse(localStorage.getItem('if_user') || 'null') } catch (e) {}

  // If we have an explicit customer id, use it; otherwise try to lookup by email
  const custId = user.value?.customer_id || user.value?.id || null

  if (!custId && user.value?.email) {
    // best-effort: search customers by email and pick first
    try {
      const res = await customersApi.getCustomers({ search: user.value.email })
      const data = (res as any).data?.value || (await res).data?.value
      if (data && Array.isArray(data) && data.length) customer.value = data[0]
    } catch (e) {
      // ignore
    }
  }

  if (custId) {
    try {
      const res = await customersApi.getCustomer(custId)
      const data = (res as any).data?.value || (await res).data?.value
      customer.value = data
    } catch (e) {
      // ignore
    }
  }

  // Fetch recent transactions and loans for this customer if we have an id
  const idForFetch = customer.value?.id || custId
  if (idForFetch) {
    // fetch paginated transactions
    await fetchTransactions(1)

    try {
      const loanRes = await customersApi.getCustomerLoans(idForFetch)
      const loanData = (loanRes as any).data?.value || (await loanRes).data?.value
      loans.value = Array.isArray(loanData) ? loanData : []
    } catch (e) {
      loans.value = []
    }
  }
})

const userInitials = computed(() => {
  if (!user.value) return 'G'
  const name = user.value.name || `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  if (!name) return (user.value.email || 'G')[0].toUpperCase()
  return name.split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase()
})

const balance = computed(() => {
  if (customer.value && typeof customer.value.account_balance === 'number') return customer.value.account_balance
  // fallback: sum deposits - withdrawals from fetched transactions
  const bal = transactions.value.reduce((acc, t) => {
    if (!t || typeof t.amount !== 'number') return acc
    if (t.type === 'deposit' || t.type === 'loan_disbursement') return acc + t.amount
    if (t.type === 'withdrawal' || t.type === 'loan_repayment') return acc - t.amount
    return acc
  }, 0)
  // ensure a minimum shown balance for empty accounts
  return Math.max(0, Math.round(bal * 100) / 100)
})

function formatDate(d: string | null | undefined) {
  if (!d) return ''
  const dt = new Date(d)
  return dt.toLocaleDateString()
}

function goToSettings() { router.push('/account/settings') }
function goToApply() { router.push('/loans/apply') }
</script>
