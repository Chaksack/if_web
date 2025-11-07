<script setup lang="ts">
import type { AuditLog } from '~/types/api'

definePageMeta({ layout: 'admin' })

// Fetch initial audit logs
const page = ref(1)
const limit = ref(50)
const { data: auditLogs, pending, refresh } = await useAudit().getAuditLogs({
  page: page.value,
  limit: limit.value,
})

// Fetch users for filter
const { data: users } = await useUsers().getUsers()

// State
const filterUser = ref<string>('all')
const filterAction = ref<string>('all')
const filterResource = ref<string>('all')
const filterDateFrom = ref('')
const filterDateTo = ref('')
const exportLoading = ref(false)

// Computed
const filteredLogs = computed(() => {
  if (!auditLogs.value) return []
  
  let filtered = auditLogs.value

  // User filter
  if (filterUser.value !== 'all') {
    filtered = filtered.filter((log: AuditLog) => log.user_id === filterUser.value)
  }

  // Action filter
  if (filterAction.value !== 'all') {
    filtered = filtered.filter((log: AuditLog) => log.action === filterAction.value)
  }

  // Resource filter
  if (filterResource.value !== 'all') {
    filtered = filtered.filter((log: AuditLog) => log.resource_type === filterResource.value)
  }

  return filtered
})

// Actions
async function applyFilters() {
  const params: any = {
    page: page.value,
    limit: limit.value,
  }

  if (filterUser.value !== 'all') {
    params.user_id = filterUser.value
  }

  if (filterAction.value !== 'all') {
    params.action = filterAction.value
  }

  if (filterResource.value !== 'all') {
    params.resource_type = filterResource.value
  }

  if (filterDateFrom.value) {
    params.date_from = filterDateFrom.value
  }

  if (filterDateTo.value) {
    params.date_to = filterDateTo.value
  }

  await refresh()
}

async function exportLogs(format: 'csv' | 'json') {
  exportLoading.value = true
  try {
    const params: any = {}

    if (filterUser.value !== 'all') params.user_id = filterUser.value
    if (filterAction.value !== 'all') params.action = filterAction.value
    if (filterResource.value !== 'all') params.resource_type = filterResource.value
    if (filterDateFrom.value) params.date_from = filterDateFrom.value
    if (filterDateTo.value) params.date_to = filterDateTo.value

    const blob = await useAudit().exportAuditLogs(format, params)
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export logs:', error)
  } finally {
    exportLoading.value = false
  }
}

function clearFilters() {
  filterUser.value = 'all'
  filterAction.value = 'all'
  filterResource.value = 'all'
  filterDateFrom.value = ''
  filterDateTo.value = ''
  page.value = 1
  applyFilters()
}

function nextPage() {
  page.value++
  applyFilters()
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    applyFilters()
  }
}

// Badge variants
const getActionVariant = (action: string) => {
  switch (action) {
    case 'create': return 'default'
    case 'update': return 'secondary'
    case 'delete': return 'destructive'
    case 'approve': return 'default'
    case 'reject': return 'destructive'
    case 'login': return 'outline'
    case 'logout': return 'outline'
    default: return 'outline'
  }
}

// Get user name from ID
function getUserName(userId: string) {
  const user = users.value?.find((u: any) => u.id === userId)
  return user ? `${user.first_name} ${user.last_name}` : userId
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Audit Logs</h2>
        <p class="text-muted-foreground">
          Track all system activities and user actions
        </p>
      </div>
      <div class="flex gap-2">
        <Button
          variant="outline"
          @click="exportLogs('csv')"
          :disabled="exportLoading"
        >
          <Icon v-if="exportLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          <Icon v-else name="lucide:file-text" class="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          @click="exportLogs('json')"
          :disabled="exportLoading"
        >
          <Icon v-if="exportLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          <Icon v-else name="lucide:download" class="mr-2 h-4 w-4" />
          Export JSON
        </Button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Actions</CardTitle>
          <Icon name="lucide:activity" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ auditLogs?.length || 0 }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Creates</CardTitle>
          <Icon name="lucide:plus-circle" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ auditLogs?.filter((log: AuditLog) => log.action === 'create').length || 0 }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Updates</CardTitle>
          <Icon name="lucide:edit" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ auditLogs?.filter((log: AuditLog) => log.action === 'update').length || 0 }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Deletes</CardTitle>
          <Icon name="lucide:trash-2" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ auditLogs?.filter((log: AuditLog) => log.action === 'delete').length || 0 }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Filter Logs</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            @click="clearFilters"
          >
            <Icon name="lucide:x" class="mr-1 h-4 w-4" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div class="space-y-2">
            <Label>User</Label>
            <Select v-model="filterUser">
              <SelectTrigger>
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.first_name }} {{ user.last_name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Action</Label>
            <Select v-model="filterAction">
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Resource Type</Label>
            <Select v-model="filterResource">
              <SelectTrigger>
                <SelectValue placeholder="All Resources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="transaction">Transaction</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>From Date</Label>
            <Input v-model="filterDateFrom" type="date" />
          </div>
          <div class="space-y-2">
            <Label>To Date</Label>
            <Input v-model="filterDateTo" type="date" />
          </div>
        </div>
        <div class="mt-4">
          <Button @click="applyFilters" :disabled="pending">
            <Icon name="lucide:filter" class="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-64">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Audit Logs Table -->
    <Card v-else>
      <CardContent class="p-0">
        <ScrollArea class="h-[600px]">
          <Table v-if="filteredLogs.length > 0">
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource Type</TableHead>
                <TableHead>Resource ID</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="log in filteredLogs" :key="log.id">
                <TableCell class="font-mono text-xs">
                  {{ new Date(log.timestamp).toLocaleString() }}
                </TableCell>
                <TableCell>
                  {{ getUserName(log.user_id) }}
                </TableCell>
                <TableCell>
                  <Badge :variant="getActionVariant(log.action)">
                    {{ log.action }}
                  </Badge>
                </TableCell>
                <TableCell class="capitalize">{{ log.resource_type }}</TableCell>
                <TableCell class="font-mono text-xs">{{ log.resource_id }}</TableCell>
                <TableCell class="max-w-md">
                  <div v-if="log.changes" class="text-xs space-y-1">
                    <div v-for="(value, key) in log.changes" :key="key" class="truncate">
                      <span class="font-medium">{{ key }}:</span>
                      <span class="text-muted-foreground ml-1">{{ value }}</span>
                    </div>
                  </div>
                  <span v-else class="text-muted-foreground">-</span>
                </TableCell>
                <TableCell class="font-mono text-xs">{{ log.ip_address }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <Icon name="lucide:inbox" class="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 class="mt-4 text-lg font-semibold">No audit logs found</h3>
            <p class="text-sm text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        </ScrollArea>
      </CardContent>
      
      <!-- Pagination -->
      <CardFooter class="flex items-center justify-between border-t">
        <div class="text-sm text-muted-foreground">
          Page {{ page }} • Showing {{ filteredLogs.length }} records
        </div>
        <div class="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            @click="prevPage"
            :disabled="page === 1 || pending"
          >
            <Icon name="lucide:chevron-left" class="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click="nextPage"
            :disabled="filteredLogs.length < limit || pending"
          >
            Next
            <Icon name="lucide:chevron-right" class="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
