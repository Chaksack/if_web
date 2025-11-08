<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Content Test</h1>
    
    <div v-if="pending">Loading...</div>
    
    <div v-else-if="error" class="text-red-600">
      Error: {{ error.message }}
    </div>
    
    <div v-else-if="data">
      <h2 class="text-xl mb-2">Found {{ data.length }} articles:</h2>
      <div v-for="article in data" :key="article._path" class="mb-4 p-4 border">
        <h3 class="font-bold">{{ article.title }}</h3>
        <p class="text-gray-600">{{ article.description }}</p>
        <small class="text-gray-500">Path: {{ article._path }}</small>
      </div>
    </div>
    
    <div v-else>
      No data available
    </div>
  </div>
</template>

<script setup>
// Simple test query
const { data, pending, error } = await useAsyncData('test-news', () => 
  queryContent('/news').find()
)

console.log('Test query result:', { 
  data: data.value, 
  pending: pending.value, 
  error: error.value 
})
</script>