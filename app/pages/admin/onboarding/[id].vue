<script setup lang="ts">
import type { Onboarding } from '~/types/api'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const onboardingId = route.params.id as string

// Fetch onboarding details
const { data: onboarding, pending, refresh } = await useOnboarding().getOnboarding(onboardingId)

// Fetch agents for assignment
const { data: agents } = await useAgents().getAgents()

// State
const remarks = ref('')
const selectedAgentId = ref('')
const showApproveDialog = ref(false)
const showRejectDialog = ref(false)
const showAssignDialog = ref(false)
const actionLoading = ref(false)

// Approve application
async function approveApplication() {
  actionLoading.value = true
  try {
    await useOnboarding().updateOnboardingStatus(onboardingId, 'completed', remarks.value)
    showApproveDialog.value = false
    await refresh()
    // Show success toast
  } catch (error) {
    console.error('Failed to approve:', error)
  } finally {
    actionLoading.value = false
  }
}

// Reject application
async function rejectApplication() {
  if (!remarks.value.trim()) {
    alert('Please provide a rejection reason')
    return
  }
  
  actionLoading.value = true
  try {
    await useOnboarding().updateOnboardingStatus(onboardingId, 'rejected', remarks.value)
    showRejectDialog.value = false
    await refresh()
    // Show success toast
  } catch (error) {
    console.error('Failed to reject:', error)
  } finally {
    actionLoading.value = false
  }
}

// Assign to agent (for USSD leads)
async function assignToAgent() {
  if (!selectedAgentId.value) {
    alert('Please select an agent')
    return
  }
  
  actionLoading.value = true
  try {
    await useOnboarding().assignToAgent(onboardingId, selectedAgentId.value)
    showAssignDialog.value = false
    await refresh()
    // Show success toast
  } catch (error) {
    console.error('Failed to assign:', error)
  } finally {
    actionLoading.value = false
  }
}

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
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center h-96">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Content -->
    <div v-else-if="onboarding" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" @click="router.back()" class="mb-2">
            <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
          <h2 class="text-3xl font-bold tracking-tight">
            {{ onboarding.first_name }} {{ onboarding.last_name }}
          </h2>
          <p class="text-muted-foreground">
            Application ID: {{ onboarding.id }}
          </p>
        </div>
        <div class="flex gap-2">
          <Badge :variant="getStatusVariant(onboarding.status)" class="text-lg px-4 py-2">
            {{ onboarding.status }}
          </Badge>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="onboarding.status === 'pending'" class="flex gap-2">
        <Button @click="showApproveDialog = true" variant="default">
          <Icon name="lucide:check-circle" class="mr-2 h-4 w-4" />
          Approve Application
        </Button>
        <Button @click="showRejectDialog = true" variant="destructive">
          <Icon name="lucide:x-circle" class="mr-2 h-4 w-4" />
          Reject Application
        </Button>
        <Button @click="showAssignDialog = true" variant="outline">
          <Icon name="lucide:user-plus" class="mr-2 h-4 w-4" />
          Assign to Agent
        </Button>
      </div>

      <!-- Customer Details -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Personal Information -->
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label class="text-muted-foreground">Full Name</Label>
              <p class="font-medium">{{ onboarding.first_name }} {{ onboarding.last_name }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">National ID</Label>
              <p class="font-medium font-mono">{{ onboarding.national_id }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Location</Label>
              <p class="font-medium">{{ onboarding.location }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Agent ID</Label>
              <p class="font-medium font-mono text-sm">{{ onboarding.agent_id }}</p>
            </div>
            <div>
              <Label class="text-muted-foreground">Submitted Date</Label>
              <p class="font-medium">{{ new Date(onboarding.created_at).toLocaleString() }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Remarks & History -->
        <Card>
          <CardHeader>
            <CardTitle>Admin Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="onboarding.admin_remarks" class="bg-muted p-4 rounded-lg">
              <p class="text-sm">{{ onboarding.admin_remarks }}</p>
            </div>
            <p v-else class="text-sm text-muted-foreground italic">
              No remarks added yet
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Submitted Documents -->
      <Card>
        <CardHeader>
          <CardTitle>Submitted Documents</CardTitle>
          <CardDescription>Click on any document to view in full size</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <!-- National ID -->
            <div v-if="onboarding.national_id_file_path" class="border rounded-lg p-4 space-y-2">
              <Label class="text-xs font-medium">National ID</Label>
              <div class="aspect-video bg-muted rounded flex items-center justify-center">
                <Icon name="lucide:file-image" class="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" class="w-full" as-child>
                <a :href="`http://localhost:8080${onboarding.national_id_file_path}`" target="_blank">
                  <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                  View
                </a>
              </Button>
            </div>

            <!-- Utility Bill -->
            <div v-if="onboarding.utility_bill_file_path" class="border rounded-lg p-4 space-y-2">
              <Label class="text-xs font-medium">Utility Bill</Label>
              <div class="aspect-video bg-muted rounded flex items-center justify-center">
                <Icon name="lucide:file-image" class="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" class="w-full" as-child>
                <a :href="`http://localhost:8080${onboarding.utility_bill_file_path}`" target="_blank">
                  <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                  View
                </a>
              </Button>
            </div>

            <!-- Bank Statement -->
            <div v-if="onboarding.bank_statement_file_path" class="border rounded-lg p-4 space-y-2">
              <Label class="text-xs font-medium">Bank Statement</Label>
              <div class="aspect-video bg-muted rounded flex items-center justify-center">
                <Icon name="lucide:file-image" class="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" class="w-full" as-child>
                <a :href="`http://localhost:8080${onboarding.bank_statement_file_path}`" target="_blank">
                  <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                  View
                </a>
              </Button>
            </div>

            <!-- Mobile Money -->
            <div v-if="onboarding.mobile_money_file_path" class="border rounded-lg p-4 space-y-2">
              <Label class="text-xs font-medium">Mobile Money Statement</Label>
              <div class="aspect-video bg-muted rounded flex items-center justify-center">
                <Icon name="lucide:file-image" class="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" class="w-full" as-child>
                <a :href="`http://localhost:8080${onboarding.mobile_money_file_path}`" target="_blank">
                  <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                  View
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Approve Dialog -->
    <Dialog v-model:open="showApproveDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Application</DialogTitle>
          <DialogDescription>
            This will approve the onboarding application and create a customer account.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Remarks (Optional)</Label>
            <Textarea
              v-model="remarks"
              placeholder="Add any approval notes..."
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showApproveDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="approveApplication" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Reject Dialog -->
    <Dialog v-model:open="showRejectDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
          <DialogDescription>
            Please provide a clear reason for rejecting this application.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Rejection Reason *</Label>
            <Textarea
              v-model="remarks"
              placeholder="Enter rejection reason..."
              rows="4"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showRejectDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button variant="destructive" @click="rejectApplication" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Assign to Agent Dialog -->
    <Dialog v-model:open="showAssignDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign to Agent</DialogTitle>
          <DialogDescription>
            Select an agent to complete this customer onboarding.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Select Agent *</Label>
            <Select v-model="selectedAgentId">
              <SelectTrigger>
                <SelectValue placeholder="Choose an agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="agent in agents" :key="agent.id" :value="agent.id">
                  {{ agent.name }} ({{ agent.email }})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showAssignDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="assignToAgent" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
