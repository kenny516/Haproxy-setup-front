<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Application Servers -->
      <div class="transform transition-all duration-300 hover:scale-[1.02]">
        <div class="overflow-hidden bg-white border border-blue-100 shadow-lg rounded-2xl">
          <div class="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div class="flex items-center">
              <div class="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-xl font-bold text-white">Application Servers</h2>
                <p class="mt-1 text-sm text-blue-100">
                  {{ applicationServers.length }} servers active
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div
              v-for="server in applicationServers"
              :key="server.name"
              class="mb-4 group last:mb-0"
            >
              <div
                class="flex items-center justify-between p-4 transition-all duration-200 border border-gray-100 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-md group-hover:border-blue-100"
              >
                <div class="flex items-center space-x-4">
                  <div
                    :class="[
                      'w-3 h-3 rounded-full transition-all duration-300 animate-pulse',
                      getStatusColor(server),
                    ]"
                  ></div>
                  <div>
                    <h3 class="font-medium text-gray-900">{{ server.name }}</h3>
                    <p class="text-sm text-gray-500">{{ server.address }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="px-3 py-1 text-sm text-blue-700 rounded-full bg-blue-50"
                    >Port {{ server.port }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Database Servers -->
      <div class="transform transition-all duration-300 hover:scale-[1.02]">
        <div class="overflow-hidden bg-white border shadow-lg border-emerald-100 rounded-2xl">
          <div class="p-6 bg-gradient-to-r from-emerald-600 to-teal-700">
            <div class="flex items-center">
              <div class="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 7h16"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 12h16"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 17h16"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-xl font-bold text-white">Database Servers</h2>
                <p class="mt-1 text-sm text-emerald-100">
                  {{ databaseServers.length }} servers active
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div v-for="server in databaseServers" :key="server.name" class="mb-4 group last:mb-0">
              <div
                class="flex items-center justify-between p-4 transition-all duration-200 border border-gray-100 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-md group-hover:border-emerald-100"
              >
                <div class="flex items-center space-x-4">
                  <div
                    :class="[
                      'w-3 h-3 rounded-full transition-all duration-300 animate-pulse',
                      getStatusColor(server),
                    ]"
                  ></div>
                  <div>
                    <h3 class="font-medium text-gray-900">{{ server.name }}</h3>
                    <p class="text-sm text-gray-500">{{ server.address }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="px-3 py-1 text-sm rounded-full text-emerald-700 bg-emerald-50"
                    >Port {{ server.port }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

export default {
  data() {
    return {
      applicationServers: [],
      databaseServers: [],
    }
  },
  methods: {
    async fetchServers() {
      try {
        const response = await axios.get(`${apiUrl}/haproxy/list_servers`)
        const servers = response.data
        this.applicationServers = servers.backends
        this.databaseServers = servers.db_servers
      } catch (error) {
        console.error('Error fetching servers:', error)
      }
    },
    getStatusColor(server) {
      return server.name.includes('') ? 'bg-green-500' : 'bg-yellow-500'
    },
  },
  created() {
    this.fetchServers()
  },
}
</script>
