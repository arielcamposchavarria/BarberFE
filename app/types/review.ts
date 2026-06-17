export interface Review {
  id: string
  appointmentId: string
  clientId: string
  barberId: string
  rating: 1 | 2 | 3 | 4 | 5
  comment?: string
  createdAt: string
}
