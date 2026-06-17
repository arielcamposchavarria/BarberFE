export interface Coordinates {
  lat: number
  lng: number
}

export interface Barbershop {
  id: string
  name: string
  address: string
  coordinates: Coordinates
  phone?: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
}
