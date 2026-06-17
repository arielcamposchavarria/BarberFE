/** A "corte": one offering a barber sells, with its price and duration. */
export interface Service {
  id: string
  barberId: string
  name: string
  priceCents: number
  durationMinutes: number
  imageUrl?: string
  active: boolean
}
