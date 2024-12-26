<template>
  <div
    class="min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-100 to-purple-100 sm:px-6 lg:px-8"
  >
    <div class="max-w-4xl mx-auto">
      <div class="overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div class="px-6 py-8 sm:p-10">
          <h1 class="mb-8 text-4xl font-extrabold text-center text-gray-900">
            HAProxy Configuration
          </h1>

          <div v-if="loading" class="flex items-center justify-center h-64">
            <div
              class="w-16 h-16 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"
            ></div>
          </div>

          <div
            v-else-if="error"
            class="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded-md"
          >
            <p class="font-bold">Error</p>
            <p>{{ error }}</p>
          </div>

          <div v-else-if="config" class="mt-4">
            <div class="p-4 bg-gray-100 rounded-lg shadow-inner">
              <pre
                class="whitespace-pre-wrap break-words text-sm text-gray-800 max-h-[60vh] overflow-y-auto"
                >{{ config }}</pre
              >
            </div>
          </div>

          <div class="flex justify-center mt-8">
            <button
              @click="fetchConfig"
              class="px-6 py-3 text-white transition duration-150 ease-in-out transform bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:scale-105"
            >
              Refresh Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const config = ref('')
const loading = ref(false)
const error = ref(null)
const apiUrl = import.meta.env.VITE_API_URL

const fetchConfig = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`${apiUrl}/haproxy/config`)
    config.value = response.data.config
  } catch (err) {
    error.value = 'Failed to fetch HAProxy configuration. Please try again.'
    console.error('Error fetching HAProxy config:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchConfig)
</script>
