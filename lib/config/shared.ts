export const getEnv = (env: string, defaultValue?: string) => {
  const value = process.env[env]
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${env} is not defined.`)
  }
  return value
}

export const requireEnv = (env: string) => {
  const value = getEnv(env)
  if (value === undefined) {
    throw new Error(`Environment variable ${env} is required but not defined.`)
  }
  return value
}