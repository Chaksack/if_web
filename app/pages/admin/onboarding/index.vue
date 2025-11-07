<script setup lang="ts">
import type { Onboarding } from '~/types/api'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const statusFilter = ref<string>('')
const sourceFilter = ref<string>('')

// Fetch onboardings with filters
const { data: onboardingsData, pending, refresh } = await useOnboarding().getOnboardings()

const filteredOnboardings = computed(() => {
  let result = onboardingsData.value || []

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(o =>
      o.first_name.toLowerCase().includes(query) ||
      o.last_name.toLowerCase().includes(query) ||
      o.national_id.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }

  // Apply source filter (for now, all are agency; USSD will be added later)
  // if (sourceFilter.value) {
  //   result = result.filter(o => o.source === sourceFilter.value)
  // }

  return result
})

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed': return 'default'
    case 'pending': return 'secondary'
    case 'rejected': return 'destructive'
    default: return 'outline'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          Onboarding Applications
        </h2>
        <p class="text-muted-foreground">
          Review and manage customer onboarding requests from all channels
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
        <div class="grid gap-4 md:grid-cols-3">
          <div class="space-y-2">
            <Label>Search</Label>
            <Input
              v-model="searchQuery"
              placeholder="Name, National ID..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Source</Label>
            <Select v-model="sourceFilter">
              <SelectTrigger>
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sources</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
                <SelectItem value="ussd">USSD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Results Summary -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredOnboardings.length }} of {{ onboardingsData?.length || 0 }} applications
      </div>
    </div>

    <!-- Applications Table -->
    <Card>
      <CardContent class="p-0">
        <div v-if="pending" class="p-8 text-center">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">Loading applications...</p>
        </div>

        <Table v-else-if="filteredOnboardings.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>National ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Agent ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="onboarding in filteredOnboardings" :key="onboarding.id">
              <TableCell class="font-medium">
                {{ onboarding.first_name }} {{ onboarding.last_name }}
              </TableCell>
              <TableCell>{{ onboarding.national_id }}</TableCell>
              <TableCell>{{ onboarding.location }}</TableCell>
              <TableCell class="font-mono text-xs">
                {{ onboarding.agent_id.slice(0, 8) }}...
              </TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(onboarding.status)">
                  {{ onboarding.status }}
                </Badge>
              </TableCell>
              <TableCell>
                {{ new Date(onboarding.created_at).toLocaleDateString() }}
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" as-child>
                  <NuxtLink :to="`/admin/onboarding/${onboarding.id}`">
                    <Icon name="lucide:eye" class="h-4 w-4 mr-1" />
                    View
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
