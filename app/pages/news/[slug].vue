<template>
  <div>
    <div v-if="pending" class="max-w-4xl mx-auto px-6 py-12">
      <div class="text-center">Loading article...</div>
    </div>
    
    <div v-else-if="error" class="max-w-4xl mx-auto px-6 py-12">
      <div class="text-center text-red-600">
        Article not found or error loading content.
      </div>
    </div>
    
    <article v-else-if="data" class="max-w-4xl mx-auto px-6 py-12">
      <!-- Article Header -->
      <header class="mb-8">
        <div class="mb-4">
          <NuxtLink 
            to="/news" 
            class="text-primary hover:text-primary/80 text-sm font-medium"
          >
            ← Back to News
          </NuxtLink>
        </div>
        
        <div v-if="data.featured" class="mb-4">
          <span class="inline-block bg-primary text-white text-sm px-3 py-1 rounded">
            Featured Article
          </span>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ data.title }}
        </h1>
        
        <p class="text-xl text-gray-600 mb-6">
          {{ data.description }}
        </p>
        
        <div class="flex items-center justify-between border-b border-gray-200 pb-6">
          <div class="flex items-center space-x-4">
            <div>
              <div class="text-sm font-medium text-gray-900">
                {{ data.author || 'Innovative Finance' }}
              </div>
              <div class="text-sm text-gray-500">
                Published on {{ formatDate(data.publishedAt) }}
              </div>
            </div>
          </div>
          
          <div v-if="data.tags && data.tags.length" class="flex flex-wrap gap-2">
            <span 
              v-for="tag in data.tags" 
              :key="tag"
              class="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </header>
      
      <!-- Featured Image -->
      <div v-if="data.image" class="mb-8">
        <img 
          :src="data.image" 
          :alt="data.title"
          class="w-full h-96 object-cover rounded-lg"
          @error="$event.target.style.display='none'"
        />
      </div>
      
      <!-- Article Content -->
      <div class="prose prose-lg max-w-none">
        <ContentRenderer :value="data" />
      </div>
      
      <!-- Article Footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Share this article</h3>
            <div class="flex space-x-4">
              <button 
                @click="shareOnTwitter"
                class="text-gray-500 hover:text-blue-400 transition-colors"
              >
                Twitter
              </button>
              <button 
                @click="shareOnFacebook"
                class="text-gray-500 hover:text-blue-600 transition-colors"
              >
                Facebook
              </button>
              <button 
                @click="shareOnLinkedIn"
                class="text-gray-500 hover:text-blue-700 transition-colors"
              >
                LinkedIn
              </button>
              <button 
                @click="copyToClipboard"
                class="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
          
          <div class="text-right">
            <NuxtLink 
              to="/news" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              View All News
            </NuxtLink>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()

// Fetch the specific news article
const { data, pending, error } = await useAsyncData(`news-${route.params.slug}`, () => 
  queryContent('/news', route.params.slug).findOne()
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

// Share functions
function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(data.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(data.value.title)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // You could add a toast notification here
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

// Meta tags
useHead(() => ({
  title: `${data.value?.title || 'News Article'} - Innovative Finance`,
  meta: [
    {
      name: 'description',
      content: data.value?.description || 'News article from Innovative Finance'
    },
    {
      property: 'og:title',
      content: data.value?.title
    },
    {
      property: 'og:description',
      content: data.value?.description
    },
    {
      property: 'og:image',
      content: data.value?.image
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
}))
</script>