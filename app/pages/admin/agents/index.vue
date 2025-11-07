<script setup lang="ts">
import type { Agent } from '~/types/api'

definePageMeta({ layout: 'admin' })

// State
const searchQuery = ref('')
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedAgent = ref<Agent | null>(null)

// Form state
const form = ref({
  name: '',
  email: '',
})
const formLoading = ref(false)

// Fetch agents
const { data: agents, pending, refresh } = await useAgents().getAgents()

// Filtered agents
const filteredAgents = computed(() => {
  if (!agents.value) return []
  if (!searchQuery.value) return agents.value
  
  const query = searchQuery.value.toLowerCase()
  return agents.value.filter((agent: Agent) =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  )
})

// Create agent
async function createAgent() {
  if (!form.value.name || !form.value.email) {
    alert('Please fill all fields')
    return
  }
  
  formLoading.value = true
  try {
    await useAgents().createAgent(form.value)
    showCreateDialog.value = false
    form.value = { name: '', email: '' }
    await refresh()
  } catch (error) {
    console.error('Failed to create agent:', error)
  } finally {
    formLoading.value = false
  }
}

// Edit agent
async function editAgent() {
  if (!selectedAgent.value || !form.value.name || !form.value.email) return
  
  formLoading.value = true
  try {
    await useAgents().updateAgent(selectedAgent.value.id, form.value)
    showEditDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to update agent:', error)
  } finally {
    formLoading.value = false
  }
}

// Delete agent
async function deleteAgent() {
  if (!selectedAgent.value) return
  
  formLoading.value = true
  try {
    await useAgents().deleteAgent(selectedAgent.value.id)
    showDeleteDialog.value = false
    selectedAgent.value = null
    await refresh()
  } catch (error) {
    console.error('Failed to delete agent:', error)
  } finally {
    formLoading.value = false
  }
}

// Open edit dialog
function openEditDialog(agent: Agent) {
  selectedAgent.value = agent
  form.value = {
    name: agent.name,
    email: agent.email,
  }
  showEditDialog.value = true
}

// Open delete dialog
function openDeleteDialog(agent: Agent) {
  selectedAgent.value = agent
  showDeleteDialog.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          Agent Management
        </h2>
        <p class="text-muted-foreground">
          Manage field agents who onboard new customers
        </p>
      </div>
      <Button @click="showCreateDialog = true">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Add New Agent
      </Button>
    </div>

    <!-- Search -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-2">
          <Icon name="lucide:search" class="h-5 w-5 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            placeholder="Search by name or email..."
            class="w-full"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Agents</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ agents?.length || 0 }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Agents Table -->
    <Card>
      <CardContent class="p-0">
        <div v-if="pending" class="p-8 text-center">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">Loading agents...</p>
        </div>

        <Table v-else-if="filteredAgents.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Total Onboardings</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="agent in filteredAgents" :key="agent.id">
              <TableCell class="font-medium">{{ agent.name }}</TableCell>
              <TableCell>{{ agent.email }}</TableCell>
              <TableCell>{{ new Date(agent.created_at).toLocaleDateString() }}</TableCell>
              <TableCell>{{ agent.onboardings?.length || 0 }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" @click="openEditDialog(agent)">
                    <Icon name="lucide:pencil" class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" @click="openDeleteDialog(agent)">
                    <Icon name="lucide:trash-2" class="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-else class="p-8 text-center">
          <Icon name="lucide:users" class="h-12 w-12 mx-auto text-muted-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">No agents found</p>
        </div>
      </CardContent>
    </Card>

    <!-- Create Agent Dialog -->
    <Dialog v-model:open="showCreateDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Agent</DialogTitle>
          <DialogDescription>
            Create a new field agent account for customer onboarding.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Name *</Label>
            <Input v-model="form.name" placeholder="John Doe" />
          </div>
          <div class="space-y-2">
            <Label>Email *</Label>
            <Input v-model="form.email" type="email" placeholder="john@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCreateDialog = false" :disabled="formLoading">
            Cancel
          </Button>
          <Button @click="createAgent" :disabled="formLoading">
            <Icon v-if="formLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Create Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Edit Agent Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
          <DialogDescription>
            Update agent information.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Name *</Label>
            <Input v-model="form.name" placeholder="John Doe" />
          </div>
          <div class="space-y-2">
            <Label>Email *</Label>
            <Input v-model="form.email" type="email" placeholder="john@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showEditDialog = false" :disabled="formLoading">
            Cancel
          </Button>
          <Button @click="editAgent" :disabled="formLoading">
            <Icon v-if="formLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Agent Dialog -->
    <Dialog v-model:open="showDeleteDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Agent</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this agent? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedAgent" class="py-4">
          <Alert variant="destructive">
            <Icon name="lucide:alert-triangle" class="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You are about to delete: <strong>{{ selectedAgent.name }}</strong> ({{ selectedAgent.email }})
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteDialog = false" :disabled="formLoading">
            Cancel
          </Button>
          <Button variant="destructive" @click="deleteAgent" :disabled="formLoading">
            <Icon v-if="formLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
