<script setup lang="ts">
import type { User } from '~/types/api'

definePageMeta({ layout: 'admin' })

// Fetch users
const { data: users, pending, refresh } = await useUsers().getUsers()

// State
const searchQuery = ref('')
const filterRole = ref<string>('all')
const filterStatus = ref<string>('all')
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const showPasswordDialog = ref(false)
const selectedUser = ref<User | null>(null)
const actionLoading = ref(false)

const createForm = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  role: 'loan_officer' as 'admin' | 'cro' | 'loan_officer',
  is_active: true,
})

const editForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  role: 'loan_officer' as 'admin' | 'cro' | 'loan_officer',
})

// Computed
const filteredUsers = computed(() => {
  if (!users.value) return []
  
  let filtered = users.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((u: User) =>
      u.first_name.toLowerCase().includes(query) ||
      u.last_name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    )
  }

  // Role filter
  if (filterRole.value !== 'all') {
    filtered = filtered.filter((u: User) => u.role === filterRole.value)
  }

  // Status filter
  if (filterStatus.value !== 'all') {
    const isActive = filterStatus.value === 'active'
    filtered = filtered.filter((u: User) => u.is_active === isActive)
  }

  return filtered
})

// Role badge variants
const getRoleVariant = (role: string) => {
  switch (role) {
    case 'admin': return 'destructive'
    case 'cro': return 'default'
    case 'loan_officer': return 'secondary'
    default: return 'outline'
  }
}

// Actions
function openCreateDialog() {
  createForm.value = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'loan_officer',
    is_active: true,
  }
  showCreateDialog.value = true
}

function openEditDialog(user: User) {
  selectedUser.value = user
  editForm.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  }
  showEditDialog.value = true
}

function openDeleteDialog(user: User) {
  selectedUser.value = user
  showDeleteDialog.value = true
}

const newPassword = ref('')

function openPasswordDialog(user: User) {
  selectedUser.value = user
  newPassword.value = ''
  showPasswordDialog.value = true
}

async function createUser() {
  actionLoading.value = true
  try {
    await useUsers().createUser(createForm.value)
    showCreateDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to create user:', error)
  } finally {
    actionLoading.value = false
  }
}

async function updateUser() {
  if (!selectedUser.value) return
  
  actionLoading.value = true
  try {
    await useUsers().updateUser(selectedUser.value.id, editForm.value)
    showEditDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to update user:', error)
  } finally {
    actionLoading.value = false
  }
}

async function deleteUser() {
  if (!selectedUser.value) return
  
  actionLoading.value = true
  try {
    await useUsers().deleteUser(selectedUser.value.id)
    showDeleteDialog.value = false
    await refresh()
  } catch (error) {
    console.error('Failed to delete user:', error)
  } finally {
    actionLoading.value = false
  }
}

async function toggleUserStatus(user: User) {
  actionLoading.value = true
  try {
    await useUsers().toggleUserStatus(user.id, !user.is_active)
    await refresh()
  } catch (error) {
    console.error('Failed to toggle user status:', error)
  } finally {
    actionLoading.value = false
  }
}

async function resetPassword() {
  if (!selectedUser.value) return
  
  actionLoading.value = true
  try {
    await useUsers().resetUserPassword(selectedUser.value.id, newPassword.value)
    showPasswordDialog.value = false
  } catch (error) {
    console.error('Failed to reset password:', error)
  } finally {
    actionLoading.value = false
  }
}

// Role permissions matrix
const permissions = {
  admin: {
    onboarding: ['view', 'approve', 'reject', 'assign'],
    loans: ['view', 'approve', 'reject', 'flag'],
    transactions: ['view', 'flag', 'resolve'],
    customers: ['view', 'edit'],
    agents: ['view', 'create', 'edit', 'delete'],
    users: ['view', 'create', 'edit', 'delete'],
    audit: ['view', 'export'],
    analytics: ['view'],
  },
  cro: {
    onboarding: ['view', 'approve', 'reject', 'assign'],
    loans: ['view', 'approve', 'reject', 'flag'],
    transactions: ['view', 'flag', 'resolve'],
    customers: ['view', 'edit'],
    agents: ['view', 'create', 'edit'],
    users: ['view'],
    audit: ['view', 'export'],
    analytics: ['view'],
  },
  loan_officer: {
    onboarding: ['view'],
    loans: ['view'],
    transactions: ['view'],
    customers: ['view'],
    agents: ['view'],
    users: [],
    audit: [],
    analytics: ['view'],
  },
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Staff Management</h2>
        <p class="text-muted-foreground">
          Manage staff accounts and role-based permissions
        </p>
      </div>
      <Button @click="openCreateDialog">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Users</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ users?.length || 0 }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Admins</CardTitle>
          <Icon name="lucide:shield" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ users?.filter((u: User) => u.role === 'admin').length || 0 }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">CROs</CardTitle>
          <Icon name="lucide:user-check" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ users?.filter((u: User) => u.role === 'cro').length || 0 }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Loan Officers</CardTitle>
          <Icon name="lucide:user" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ users?.filter((u: User) => u.role === 'loan_officer').length || 0 }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Filter Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <Input
            v-model="searchQuery"
            placeholder="Search by name or email..."
          >
            <template #prefix>
              <Icon name="lucide:search" class="h-4 w-4" />
            </template>
          </Input>
          <Select v-model="filterRole">
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="cro">CRO</SelectItem>
              <SelectItem value="loan_officer">Loan Officer</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="filterStatus">
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-64">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Users Table -->
    <Card v-else>
      <CardContent class="p-0">
        <Table v-if="filteredUsers.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="user in filteredUsers" :key="user.id">
              <TableCell>
                <div class="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {{ user.first_name[0] }}{{ user.last_name[0] }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-medium">{{ user.first_name }} {{ user.last_name }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>
                <Badge :variant="getRoleVariant(user.role)">
                  {{ user.role.replace('_', ' ') }}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge :variant="user.is_active ? 'default' : 'outline'">
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </Badge>
              </TableCell>
              <TableCell>
                {{ user.last_login ? new Date(user.last_login).toLocaleString() : 'Never' }}
              </TableCell>
              <TableCell>{{ new Date(user.created_at).toLocaleDateString() }}</TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="openEditDialog(user)"
                  >
                    <Icon name="lucide:pencil" class="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="toggleUserStatus(user)"
                    :disabled="actionLoading"
                  >
                    <Icon :name="user.is_active ? 'lucide:user-x' : 'lucide:user-check'" class="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="openPasswordDialog(user)"
                  >
                    <Icon name="lucide:key" class="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="openDeleteDialog(user)"
                  >
                    <Icon name="lucide:trash-2" class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-else class="p-8 text-center">
          <Icon name="lucide:users" class="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-lg font-semibold">No users found</h3>
          <p class="text-sm text-muted-foreground">
            Try adjusting your filters or create a new user
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Permissions Matrix -->
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions Matrix</CardTitle>
        <CardDescription>
          Overview of permissions granted to each role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Module</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>CRO</TableHead>
              <TableHead>Loan Officer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(perms, module) in permissions.admin" :key="module">
              <TableCell class="font-medium capitalize">{{ module }}</TableCell>
              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="perm in permissions.admin[module]"
                    :key="perm"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ perm }}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="perm in permissions.cro[module]"
                    :key="perm"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ perm }}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="perm in permissions.loan_officer[module]"
                    :key="perm"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ perm }}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Create User Dialog -->
    <Dialog v-model:open="showCreateDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to the system with assigned role and permissions.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>First Name *</Label>
              <Input v-model="createForm.first_name" />
            </div>
            <div class="space-y-2">
              <Label>Last Name *</Label>
              <Input v-model="createForm.last_name" />
            </div>
          </div>
          <div class="space-y-2">
            <Label>Email *</Label>
            <Input v-model="createForm.email" type="email" />
          </div>
          <div class="space-y-2">
            <Label>Password *</Label>
            <Input v-model="createForm.password" type="password" />
          </div>
          <div class="space-y-2">
            <Label>Role *</Label>
            <Select v-model="createForm.role">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="cro">CRO</SelectItem>
                <SelectItem value="loan_officer">Loan Officer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center space-x-2">
            <input
              id="is_active"
              v-model="createForm.is_active"
              type="checkbox"
              class="h-4 w-4"
            />
            <label for="is_active" class="text-sm font-medium cursor-pointer">
              Active User
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCreateDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="createUser" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Edit User Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and role assignment.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>First Name *</Label>
              <Input v-model="editForm.first_name" />
            </div>
            <div class="space-y-2">
              <Label>Last Name *</Label>
              <Input v-model="editForm.last_name" />
            </div>
          </div>
          <div class="space-y-2">
            <Label>Email *</Label>
            <Input v-model="editForm.email" type="email" />
          </div>
          <div class="space-y-2">
            <Label>Role *</Label>
            <Select v-model="editForm.role">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="cro">CRO</SelectItem>
                <SelectItem value="loan_officer">Loan Officer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showEditDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="updateUser" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete User Dialog -->
    <Dialog v-model:open="showDeleteDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Alert variant="destructive">
            <Icon name="lucide:alert-triangle" class="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting {{ selectedUser?.first_name }} {{ selectedUser?.last_name }} will remove their access immediately.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button variant="destructive" @click="deleteUser" :disabled="actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Reset Password Dialog -->
    <Dialog v-model:open="showPasswordDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Set a new temporary password for {{ selectedUser?.email }}.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4 space-y-2">
          <Label>New Temporary Password *</Label>
          <Input v-model="newPassword" type="password" placeholder="Enter new password" />
          <p class="text-xs text-muted-foreground">They will be prompted to change it on next login.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showPasswordDialog = false" :disabled="actionLoading">
            Cancel
          </Button>
          <Button @click="resetPassword" :disabled="!newPassword || actionLoading">
            <Icon v-if="actionLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            Send Reset Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
