<script setup lang="ts">
import type { Loan } from '~/types/api'

definePageMeta({ layout: 'admin' })

// Fetch loans
const { data: loans, pending, refresh } = await useLoans().getLoans()

// State
const actionLoading = ref(false)

// Computed metrics
const totalDisbursed = computed(() => {
  if (!loans.value) return 0
  return loans.value.reduce((sum: number, loan: Loan) => sum + loan.principal_amount, 0)
})

const totalOutstanding = computed(() => {
  if (!loans.value) return 0
  return loans.value.reduce((sum: number, loan: Loan) => sum + loan.outstanding_balance, 0)
})

const activeLoans = computed(() => {
  if (!loans.value) return []
  return loans.value.filter((loan: Loan) => loan.status === 'active')
})

const overdueLoans = computed(() => {
  if (!loans.value) return []
  return loans.value.filter((loan: Loan) => loan.status === 'overdue')
})

const paidLoans = computed(() => {
  if (!loans.value) return []
  return loans.value.filter((loan: Loan) => loan.status === 'paid')
})

const defaultedLoans = computed(() => {
  if (!loans.value) return []
  return loans.value.filter((loan: Loan) => loan.status === 'defaulted')
})

const repaymentRate = computed(() => {
  if (!loans.value || loans.value.length === 0) return 0
  const totalRepaid = loans.value.reduce((sum: number, loan: Loan) => {
    return sum + (loan.principal_amount - loan.outstanding_balance)
  }, 0)
  return (totalRepaid / totalDisbursed.value) * 100
})

const averageInterestRate = computed(() => {
  if (!loans.value || loans.value.length === 0) return 0
  const total = loans.value.reduce((sum: number, loan: Loan) => sum + loan.interest_rate, 0)
  return total / loans.value.length
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
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

// Actions
async function flagLoan(loanId: string, reason: string) {
  actionLoading.value = true
  try {
    await useLoans().flagLoan(loanId, reason)
    await refresh()
  } catch (error) {
    console.error('Failed to flag loan:', error)
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Loan Portfolio</h2>
      <p class="text-muted-foreground">
        Monitor loan performance and repayment metrics
      </p>
    </div>

    <!-- Key Metrics -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Disbursed</CardTitle>
          <Icon name="lucide:trending-up" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(totalDisbursed) }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            Across {{ loans?.length || 0 }} loans
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Outstanding</CardTitle>
          <Icon name="lucide:circle-dollar-sign" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(totalOutstanding) }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            {{ ((totalOutstanding / totalDisbursed) * 100).toFixed(1) }}% of total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Repayment Rate</CardTitle>
          <Icon name="lucide:percent" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ repaymentRate.toFixed(1) }}%</div>
          <p class="text-xs text-muted-foreground mt-1">
            Portfolio health indicator
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Avg Interest Rate</CardTitle>
          <Icon name="lucide:trending-down" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ averageInterestRate.toFixed(2) }}%</div>
          <p class="text-xs text-muted-foreground mt-1">
            Across active loans
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Portfolio Distribution -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium flex items-center justify-between">
            Active Loans
            <Badge variant="default">{{ activeLoans.length }}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">
            {{ formatCurrency(activeLoans.reduce((sum: number, l: Loan) => sum + l.outstanding_balance, 0)) }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium flex items-center justify-between">
            Overdue Loans
            <Badge variant="destructive">{{ overdueLoans.length }}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold text-destructive">
            {{ formatCurrency(overdueLoans.reduce((sum: number, l: Loan) => sum + l.outstanding_balance, 0)) }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium flex items-center justify-between">
            Paid Loans
            <Badge variant="secondary">{{ paidLoans.length }}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">
            {{ formatCurrency(paidLoans.reduce((sum: number, l: Loan) => sum + l.principal_amount, 0)) }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium flex items-center justify-between">
            Defaulted Loans
            <Badge variant="destructive">{{ defaultedLoans.length }}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold text-destructive">
            {{ formatCurrency(defaultedLoans.reduce((sum: number, l: Loan) => sum + l.outstanding_balance, 0)) }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Visual Charts Placeholder -->
    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Composition</CardTitle>
          <CardDescription>Distribution by loan status</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
                <span class="text-sm">Active</span>
              </div>
              <span class="font-semibold">{{ ((activeLoans.length / (loans?.length || 1)) * 100).toFixed(1) }}%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-destructive rounded-full"></div>
                <span class="text-sm">Overdue</span>
              </div>
              <span class="font-semibold">{{ ((overdueLoans.length / (loans?.length || 1)) * 100).toFixed(1) }}%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-secondary rounded-full"></div>
                <span class="text-sm">Paid</span>
              </div>
              <span class="font-semibold">{{ ((paidLoans.length / (loans?.length || 1)) * 100).toFixed(1) }}%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-muted rounded-full"></div>
                <span class="text-sm">Defaulted</span>
              </div>
              <span class="font-semibold">{{ ((defaultedLoans.length / (loans?.length || 1)) * 100).toFixed(1) }}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repayment Trend</CardTitle>
          <CardDescription>Monthly payment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <div class="text-center text-muted-foreground">
              <Icon name="lucide:line-chart" class="h-12 w-12 mx-auto mb-2" />
              <p class="text-sm">Chart visualization</p>
              <p class="text-xs">Install chart library for visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-64">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Overdue Loans Table -->
    <Card v-else-if="overdueLoans.length > 0">
      <CardHeader>
        <CardTitle>Overdue Loans Requiring Attention</CardTitle>
        <CardDescription>
          {{ overdueLoans.length }} loan(s) past due date
        </CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Disbursement Date</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Monthly Payment</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="loan in overdueLoans" :key="loan.id" class="bg-destructive/5">
              <TableCell>
                <NuxtLink
                  :to="`/admin/customers/${loan.customer_id}`"
                  class="text-primary hover:underline font-medium"
                >
                  {{ loan.customer_id }}
                </NuxtLink>
              </TableCell>
              <TableCell>
                {{ new Date(loan.disbursement_date).toLocaleDateString() }}
              </TableCell>
              <TableCell class="font-semibold">
                {{ formatCurrency(loan.principal_amount) }}
              </TableCell>
              <TableCell class="font-semibold text-destructive">
                {{ formatCurrency(loan.outstanding_balance) }}
              </TableCell>
              <TableCell>
                {{ formatCurrency(loan.monthly_payment) }}
              </TableCell>
              <TableCell>
                {{ new Date(loan.next_payment_date).toLocaleDateString() }}
              </TableCell>
              <TableCell>
                <Badge variant="destructive">
                  {{ Math.floor((Date.now() - new Date(loan.next_payment_date).getTime()) / (1000 * 60 * 60 * 24)) }} days
                </Badge>
              </TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="flagLoan(loan.id, 'Overdue payment')"
                    :disabled="actionLoading"
                  >
                    <Icon name="lucide:flag" class="h-4 w-4" />
                  </Button>
                  <NuxtLink :to="`/admin/customers/${loan.customer_id}`">
                    <Button size="sm" variant="ghost">
                      <Icon name="lucide:eye" class="h-4 w-4" />
                    </Button>
                  </NuxtLink>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- All Loans Table -->
    <Card>
      <CardHeader>
        <CardTitle>All Loans</CardTitle>
        <CardDescription>
          Complete portfolio overview
        </CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <Table v-if="loans && loans.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
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
                <NuxtLink
                  :to="`/admin/customers/${loan.customer_id}`"
                  class="text-primary hover:underline font-medium"
                >
                  {{ loan.customer_id }}
                </NuxtLink>
              </TableCell>
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

        <!-- Empty State -->
        <div v-else class="p-8 text-center">
          <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-lg font-semibold">No loans found</h3>
          <p class="text-sm text-muted-foreground">
            Loans will appear here once they are disbursed
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
