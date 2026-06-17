export function formatPriceCents(priceCents: number): string {
  return `₡${(priceCents / 100).toLocaleString('es-CR')}`
}
