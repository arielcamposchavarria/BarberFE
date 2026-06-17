/** Simulates network latency so the UI can rely on real async/loading states once a real API replaces these mocks. */
export function delay(ms = 200): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}
