export const validateIpAddress = (ip) => {
  const regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!regex.test(ip)) return false
  return ip.split('.').every((num) => parseInt(num) >= 0 && parseInt(num) <= 255)
}

export const validatePort = (port) => {
  return port >= 1 && port <= 65535
}

export const validateServerForm = (formData) => {
  const errors = {}

  if (!formData.name.trim()) {
    errors.name = 'Server name is required'
  }

  if (!validateIpAddress(formData.ipAddress)) {
    errors.ipAddress = 'Invalid IP address format'
  }

  if (!validatePort(formData.port)) {
    errors.port = 'Port must be between 1 and 65535'
  }

  return errors
}
