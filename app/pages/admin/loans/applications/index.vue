<script setup lang="ts">
import type { LoanApplication } from '~/types/api'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const statusFilter = ref<string>('')

// Fetch loan applications
const { data: applicationsData, pending, refresh } = await useLoans().getLoanApplications()

const filteredApplications = computed(() => {
  let result = applicationsData.value || []

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((app: LoanApplication) =>
      app.customer_id.toLowerCase().includes(query) ||
      app.purpose.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    result = result.filter((app: LoanApplication) => app.status === statusFilter.value)
  }

  return result
})

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved': return 'default'
    case 'pending': return 'secondary'
    case 'rejected': return 'destructive'
    case 'disbursed': return 'default'
    default: return 'outline'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          Loan Applications
        </h2>
        <p class="text-muted-foreground">
          Review and process customer loan requests
        </p>
      </div>
      <Button @click="refresh">
        <Icon name="lucide:refresh-cw" class="mr-2 h-4 w-4" />
        Refresh
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label>Search</Label>
            <Input
              v-model="searchQuery"
              placeholder="Customer ID, purpose..."
              class="w-full"
            />
          </div>
          <div class="space-y-2">
            <Label>Status</Label>
            <Select v-model="statusFilter">
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="disbursed">Disbursed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Applications</CardTitle>
          <Icon name="lucide:file-text" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ applicationsData?.length || 0 }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Pending Review</CardTitle>
          <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ applicationsData?.filter((a: LoanApplication) => a.status === 'pending').length || 0 }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Results -->
    <div class="text-sm text-muted-foreground">
      Showing {{ filteredApplications.length }} of {{ applicationsData?.length || 0 }} applications
    </div>

    <!-- Applications Table -->
    <Card>
      <CardContent class="p-0">
        <div v-if="pending" class="p-8 text-center">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">Loading applications...</p>
        </div>

        <Table v-else-if="filteredApplications.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Requested Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="application in filteredApplications" :key="application.id">
              <TableCell class="font-mono text-sm">
                {{ application.customer_id.slice(0, 8) }}...
              </TableCell>
              <TableCell class="font-semibold">
                {{ formatCurrency(application.requested_amount) }}
              </TableCell>
              <TableCell>{{ application.purpose }}</TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(application.status)">
                  {{ application.status }}
                </Badge>
              </TableCell>
              <TableCell>
                {{ new Date(application.created_at).toLocaleDateString() }}
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" as-child>
                  <NuxtLink :to="`/admin/loans/applications/${application.id}`">
                    <Icon name="lucide:eye" class="h-4 w-4 mr-1" />
                    Review
                  </NuxtLink>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-else class="p-8 text-center">
          <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">No applications found</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
