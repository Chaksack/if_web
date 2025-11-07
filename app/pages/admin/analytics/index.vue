<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// Fetch all data for analytics
const { data: dashboardStats } = await useFetch('/api/v1/admin/dashboard/stats', {
  ...useApi().apiFetch.options
})
const { data: onboardings } = await useOnboarding().getOnboardings()
const { data: loans } = await useLoans().getLoanApplications({})
const { data: transactions } = await useTransactions().getTransactions({})
const { data: auditLogs } = await useAudit().getAuditLogs({ limit: 100 })

// Computed Analytics
const avgDecisionTime = computed(() => {
  if (!onboardings.value || onboardings.value.length === 0) return 0
  
  const approved = onboardings.value.filter((o: any) => 
    o.status === 'approved' && o.updated_at && o.created_at
  )
  
  if (approved.length === 0) return 0
  
  const totalHours = approved.reduce((sum: number, o: any) => {
    const created = new Date(o.created_at).getTime()
    const updated = new Date(o.updated_at).getTime()
    return sum + (updated - created) / (1000 * 60 * 60)
  }, 0)
  
  return totalHours / approved.length
})

const approvalRate = computed(() => {
  if (!loans.value || loans.value.length === 0) return 0
  const approved = loans.value.filter((l: any) => l.status === 'approved').length
  return (approved / loans.value.length) * 100
})

const fraudIncidents = computed(() => {
  if (!transactions.value) return 0
  return transactions.value.filter((t: any) => t.is_flagged).length
})

const activeUsers = computed(() => {
  if (!auditLogs.value) return 0
  const uniqueUsers = new Set(auditLogs.value.map((log: any) => log.user_id))
  return uniqueUsers.size
})

// Monthly trends
const monthlyApplications = computed(() => {
  if (!onboardings.value) return []
  
  const months = new Map()
  onboardings.value.forEach((o: any) => {
    const month = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short' })
    months.set(month, (months.get(month) || 0) + 1)
  })
  
  return Array.from(months.entries()).map(([month, count]) => ({ month, count }))
})

const monthlyDisbursements = computed(() => {
  if (!loans.value) return []
  
  const approved = loans.value.filter((l: any) => l.status === 'approved')
  const months = new Map()
  
  approved.forEach((l: any) => {
    const month = new Date(l.updated_at).toLocaleDateString('en-US', { month: 'short' })
    const amount = months.get(month) || 0
    months.set(month, amount + (l.approved_amount || 0))
  })
  
  return Array.from(months.entries()).map(([month, amount]) => ({ month, amount }))
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

// Channel distribution
const channelDistribution = computed(() => {
  if (!transactions.value) return []
  
  const channels = new Map()
  transactions.value.forEach((t: any) => {
    channels.set(t.channel, (channels.get(t.channel) || 0) + 1)
  })
  
  const total = transactions.value.length
  return Array.from(channels.entries()).map(([channel, count]) => ({
    channel,
    count,
    percentage: ((count / total) * 100).toFixed(1)
  }))
})

// Recent activity
const recentActivity = computed(() => {
  if (!auditLogs.value) return []
  return auditLogs.value.slice(0, 10)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      <p class="text-muted-foreground">
        Operational metrics and performance insights
      </p>
    </div>

    <!-- Key Performance Indicators -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Avg Decision Time</CardTitle>
          <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ avgDecisionTime.toFixed(1) }}h</div>
          <p class="text-xs text-muted-foreground mt-1">
            From application to approval
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Approval Rate</CardTitle>
          <Icon name="lucide:check-circle" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ approvalRate.toFixed(1) }}%</div>
          <p class="text-xs text-muted-foreground mt-1">
            Loan application approval
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Fraud Incidents</CardTitle>
          <Icon name="lucide:shield-alert" class="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-destructive">{{ fraudIncidents }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            Flagged transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Active Users</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ activeUsers }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            System users logged in
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts Row -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Monthly Applications Trend -->
      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
          <CardDescription>Monthly onboarding applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="monthlyApplications.length > 0" class="space-y-3">
            <div
              v-for="item in monthlyApplications"
              :key="item.month"
              class="flex items-center justify-between"
            >
              <span class="text-sm font-medium">{{ item.month }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary rounded-full"
                    :style="{ width: `${(item.count / Math.max(...monthlyApplications.map(i => i.count))) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm font-bold w-8 text-right">{{ item.count }}</span>
              </div>
            </div>
          </div>
          <div v-else class="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p class="text-sm text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>

      <!-- Monthly Disbursements -->
      <Card>
        <CardHeader>
          <CardTitle>Disbursement Volume</CardTitle>
          <CardDescription>Monthly loan disbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="monthlyDisbursements.length > 0" class="space-y-3">
            <div
              v-for="item in monthlyDisbursements"
              :key="item.month"
              class="flex items-center justify-between"
            >
              <span class="text-sm font-medium">{{ item.month }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary rounded-full"
                    :style="{ width: `${(item.amount / Math.max(...monthlyDisbursements.map(i => i.amount))) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm font-bold w-24 text-right">{{ formatCurrency(item.amount) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p class="text-sm text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Channel Distribution & Recent Activity -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Channel Distribution -->
      <Card>
        <CardHeader>
          <CardTitle>Transaction Channels</CardTitle>
          <CardDescription>Distribution by payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="channelDistribution.length > 0" class="space-y-4">
            <div
              v-for="item in channelDistribution"
              :key="item.channel"
              class="space-y-2"
            >
              <div class="flex items-center justify-between text-sm">
                <span class="font-medium capitalize">{{ item.channel.replace('_', ' ') }}</span>
                <span class="text-muted-foreground">{{ item.count }} ({{ item.percentage }}%)</span>
              </div>
              <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary rounded-full transition-all"
                  :style="{ width: `${item.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
          <div v-else class="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p class="text-sm text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea class="h-[280px]">
            <div v-if="recentActivity.length > 0" class="space-y-4">
              <div
                v-for="log in recentActivity"
                :key="log.id"
                class="flex items-start gap-3 pb-3 border-b last:border-0"
              >
                <div class="mt-1">
                  <Icon
                    :name="log.action === 'create' ? 'lucide:plus-circle' :
                           log.action === 'update' ? 'lucide:edit' :
                           log.action === 'delete' ? 'lucide:trash-2' :
                           log.action === 'approve' ? 'lucide:check-circle' :
                           log.action === 'reject' ? 'lucide:x-circle' :
                           'lucide:activity'"
                    class="h-4 w-4"
                    :class="{
                      'text-primary': log.action === 'create',
                      'text-secondary': log.action === 'update',
                      'text-destructive': log.action === 'delete' || log.action === 'reject',
                      'text-green-600': log.action === 'approve',
                    }"
                  />
                </div>
                <div class="flex-1 space-y-1">
                  <p class="text-sm">
                    <span class="font-medium capitalize">{{ log.action }}</span>
                    <span class="text-muted-foreground"> {{ log.resource_type }}</span>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ new Date(log.timestamp).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="h-[200px] flex items-center justify-center">
              <p class="text-sm text-muted-foreground">No recent activity</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>

    <!-- Detailed Metrics Table -->
    <Card>
      <CardHeader>
        <CardTitle>Operational Metrics</CardTitle>
        <CardDescription>
          Comprehensive performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium">Total Applications</TableCell>
              <TableCell class="text-2xl font-bold">{{ onboardings?.length || 0 }}</TableCell>
              <TableCell class="text-muted-foreground">Customer onboarding requests</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Pending Reviews</TableCell>
              <TableCell class="text-2xl font-bold">
                {{ onboardings?.filter((o: any) => o.status === 'pending').length || 0 }}
              </TableCell>
              <TableCell class="text-muted-foreground">Awaiting CRO decision</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Loan Applications</TableCell>
              <TableCell class="text-2xl font-bold">{{ loans?.length || 0 }}</TableCell>
              <TableCell class="text-muted-foreground">Total loan requests</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Approved Loans</TableCell>
              <TableCell class="text-2xl font-bold text-green-600">
                {{ loans?.filter((l: any) => l.status === 'approved').length || 0 }}
              </TableCell>
              <TableCell class="text-muted-foreground">Successfully approved applications</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Transaction Volume</TableCell>
              <TableCell class="text-2xl font-bold">{{ transactions?.length || 0 }}</TableCell>
              <TableCell class="text-muted-foreground">Total processed transactions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Flagged Transactions</TableCell>
              <TableCell class="text-2xl font-bold text-destructive">{{ fraudIncidents }}</TableCell>
              <TableCell class="text-muted-foreground">Suspicious activity detected</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">System Actions</TableCell>
              <TableCell class="text-2xl font-bold">{{ auditLogs?.length || 0 }}</TableCell>
              <TableCell class="text-muted-foreground">Audit trail entries</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
