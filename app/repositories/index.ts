import { authRepositoryMock } from './auth.repository.mock'
import { barbershopRepositoryMock } from './barbershop.repository.mock'
import { barberRepositoryMock } from './barber.repository.mock'
import { clientRepositoryMock } from './client.repository.mock'
import { serviceRepositoryMock } from './service.repository.mock'
import { availabilityRepositoryMock } from './availability.repository.mock'
import { appointmentRepositoryMock } from './appointment.repository.mock'
import { reviewRepositoryMock } from './review.repository.mock'

/**
 * The single seam between business logic and data access. Every service
 * imports `repositories` from here, never a `*.mock.ts` file directly, so
 * swapping these mock implementations for real API-backed ones later only
 * requires changing this file.
 */
export const repositories = {
  auth: authRepositoryMock,
  barbershop: barbershopRepositoryMock,
  barber: barberRepositoryMock,
  client: clientRepositoryMock,
  service: serviceRepositoryMock,
  availability: availabilityRepositoryMock,
  appointment: appointmentRepositoryMock,
  review: reviewRepositoryMock
}
