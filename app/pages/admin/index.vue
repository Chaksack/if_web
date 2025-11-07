<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

import type { DashboardStats } from '~/types/api'

// Fetch dashboard statistics
const { data: statsData, pending, error, refresh } = await useApi().get<DashboardStats>('/admin/dashboard/stats')

const stats = computed(() => statsData.value || {
  pending_onboardings: 0,
  pending_loans: 0,
  total_agents: 0,
  total_customers: 0,
  total_transactions_today: 0,
  total_loan_disbursed: 0,
  outstanding_loans: 0,
  overdue_loans: 0,
})

// Fetch recent agents
const { data: agentsData } = await useAgents().getAgents()
const recentAgents = computed(() => (agentsData.value || []).slice(0, 3))

// Fetch recent onboardings
const { data: onboardingsData } = await useOnboarding().getOnboardings({ status: 'pending' })
const recentOnboardings = computed(() => (onboardingsData.value || []).slice(0, 3))
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p class="text-muted-foreground">
          Welcome to the admin dashboard. Here's an overview of your agent network.
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" as-child>
          <NuxtLink to="/admin/agents">
            <Icon name="lucide:users" class="mr-2 h-4 w-4" />
            Manage Agents
          </NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink to="/admin/onboarding">
            <Icon name="lucide:file-text" class="mr-2 h-4 w-4" />
            View Onboardings
          </NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">
            Total Agents
          </CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.total_agents }}</div>
          <p class="text-xs text-muted-foreground">
            Active agent accounts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">
            Total Onboardings
          </CardTitle>
          <Icon name="lucide:file-text" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.pending_onboardings + stats.pending_loans }}</div>
          <p class="text-xs text-muted-foreground">
            All customer onboarding requests
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">
            Pending Review
          </CardTitle>
          <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.pending_onboardings }}</div>
          <p class="text-xs text-muted-foreground">
            Awaiting admin review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">
            Completed
          </CardTitle>
          <Icon name="lucide:check-circle" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.total_loan_disbursed - stats.outstanding_loans }}</div>
          <p class="text-xs text-muted-foreground">
            Successfully completed
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Recent Agents -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Agents</CardTitle>
          <CardDescription>
            Newly registered agents in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="agent in recentAgents"
              :key="agent.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{{ agent.name.split(' ').map((n: string) => n[0]).join('') }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium">{{ agent.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ agent.email }}</p>
                </div>
              </div>
              <div class="text-xs text-muted-foreground">
                {{ new Date(agent.created_at).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" class="w-full" as-child>
            <NuxtLink to="/admin/agents">
              View all agents
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </NuxtLink>
          </Button>
        </CardFooter>
      </Card>

      <!-- Recent Onboarding Requests -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Onboarding Requests</CardTitle>
          <CardDescription>
            Latest customer onboarding submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="onboarding in recentOnboardings"
              :key="onboarding.id"
              class="flex items-center justify-between"
            >
              <div class="flex-1">
                <p class="text-sm font-medium">{{ onboarding.first_name }} {{ onboarding.last_name }}</p>
                <p class="text-xs text-muted-foreground">Agent ID: {{ onboarding.agent_id.slice(0, 8) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <Badge
                  :variant="
                    onboarding.status === 'completed' ? 'default' :
                    onboarding.status === 'pending' ? 'secondary' :
                    'destructive'
                  "
                >
                  {{ onboarding.status }}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" class="w-full" as-child>
            <NuxtLink to="/admin/onboarding">
              View all requests
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </NuxtLink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
