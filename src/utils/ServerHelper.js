export const generateId = () => Math.random().toString(36).substr(2, 9)

export const createDefaultServer = (type) => ({
  name: '',
  ipAddress: '',
  port: type === 'database' ? 3306 : 80,
  weight: 1,
  status: 'active',
  healthCheck: {
    enabled: true,
    interval: 2000,
    timeout: 5000,
    fallThreshold: 3,
  },
})

export const createServerData = (formData, type, existingServer = null) => ({
  id: existingServer?.id ?? generateId(),
  ...formData,
  type,
  isEnabled: existingServer?.isEnabled ?? true,
})
