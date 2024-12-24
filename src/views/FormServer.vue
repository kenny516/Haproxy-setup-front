<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-2xl mx-auto space-y-8">
      <!-- Header -->
      <div class="space-y-2 text-center">
        <div class="flex items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6" y2="6"></line>
            <line x1="6" y1="18" x2="6" y2="18"></line>
          </svg>
          <h1
            class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            HAProxy Config Editor
          </h1>
        </div>
        <p class="text-lg text-indigo-600">
          Configure and manage your HAProxy server settings with ease
        </p>
      </div>

      <!-- Main Card -->
      <div class="p-8 transition-all duration-300 bg-white shadow-2xl rounded-2xl hover:shadow-3xl">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-indigo-800">Add New Server</h2>
          <p class="text-indigo-600">Enter the details for your new server configuration</p>
        </div>

        <form @submit.prevent="addServer" class="space-y-6">
          <!-- Server select type database or application -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-indigo-700" for="server-type">
              Server Type
            </label>
            <select
              id="server-type"
              v-model="newServer.type"
              class="w-full p-3 transition-all duration-200 border-2 border-indigo-200 rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="" disabled selected>Select server type</option>
              <option value="database">Database</option>
              <option value="application">Application</option>
            </select>
          </div>
          <!-- Server Name Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-indigo-700" for="server-name">
              Server Name
            </label>
            <input
              id="server-name"
              type="text"
              v-model="newServer.name"
              class="w-full p-3 transition-all duration-200 border-2 border-indigo-200 rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter server name"
              required
            />
          </div>

          <!-- IP Address Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-indigo-700" for="server-ip"> IP Address </label>
            <input
              id="server-ip"
              type="text"
              v-model="newServer.ip"
              class="w-full p-3 transition-all duration-200 border-2 border-indigo-200 rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter IP address"
              required
            />
          </div>

          <!-- Port Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-indigo-700" for="server-port">
              Port Number
            </label>
            <input
              id="server-port"
              type="number"
              v-model="newServer.port"
              class="w-full p-3 transition-all duration-200 border-2 border-indigo-200 rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter port number"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full px-6 py-4 font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 hover:scale-105"
          >
            Add Server Configuration
          </button>
        </form>
      </div>
    </div>

    <!-- Toast Notifications -->
    <Toast
      :show="showSuccessToast"
      type="success"
      title="Server configuration added successfully!"
      message="Your new server has been added to the HAProxy configuration."
      @close="showSuccessToast = false"
    />
    <Toast
      :show="showErrorToast"
      type="error"
      title="Error adding server configuration"
      message="There was an error adding the server to the HAProxy configuration. Please try again."
      @close="showErrorToast = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Toast from '../components/Toast.vue'

const newServer = ref({
  name: '',
  ip: '',
  port: '',
  type: '',
})
const apiUrl = import.meta.env.VITE_API_URL
const showSuccessToast = ref(false)
const showErrorToast = ref(false)

const addServer = async () => {
  try {
    const JsonServerConfig = JSON.stringify(newServer.value)
    const response = await axios.post(apiUrl + '/add-server', {
      JsonServerConfig,
    })
    console.log('Server added:', response.data)
    newServer.value = { name: '', ip: '', port: '', type: '' }
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 5000)
  } catch (error) {
    console.error('Error adding server:', error)
    showErrorToast.value = true
    setTimeout(() => {
      showErrorToast.value = false
    }, 5000)
  }
}
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
</style>
