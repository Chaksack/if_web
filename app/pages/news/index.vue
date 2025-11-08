<template>
  <div>
    <section class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <h1 class="text-3xl font-semibold text-gray-900">News & Updates</h1>
        <p class="mt-3 max-w-2xl text-gray-600">Latest updates and insights from Innovative Finance.</p>
      </div>
    </section>
    
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <div v-if="pending" class="text-center py-8">
          <div class="text-gray-600">Loading news articles...</div>
        </div>
        
        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-600">Error loading news: {{ error.message }}</div>
        </div>
        
        <div v-else-if="data && data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="article in data" 
            :key="article._path"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div v-if="article.image" class="h-48 bg-gray-200">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-full object-cover"
                @error="$event.target.style.display='none'"
              />
            </div>
            
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <span 
                    v-if="article.featured" 
                    class="inline-block bg-primary text-white text-xs px-2 py-1 rounded"
                  >
                    Featured
                  </span>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(article.publishedAt) }}
                  </span>
                </div>
              </div>
              
              <h2 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {{ article.title }}
              </h2>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ article.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">
                  By {{ article.author || 'Innovative Finance' }}
                </div>
                
                <NuxtLink 
                  :to="article._path"
                  class="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Read more →
                </NuxtLink>
              </div>
              
              <div v-if="article.tags && article.tags.length" class="mt-4 flex flex-wrap gap-2">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
        
        <div v-else-if="!data || data.length === 0" class="text-center py-12">
          <div class="text-gray-600">
            <h3 class="text-lg font-medium mb-2">No news articles available</h3>
            <p>Check back soon for the latest updates from Innovative Finance.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Fetch all news articles
const { data, pending, error } = await useAsyncData('news-list', () => 
  queryContent('/news')
    .sort({ publishedAt: -1 })
    .find()
)

// Format date function
function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Meta tags
useHead({
  title: 'News & Updates - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Stay updated with the latest news, insights, and announcements from Innovative Finance. Read about our new products, services, and industry insights.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

