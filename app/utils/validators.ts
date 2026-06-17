export function isValidUsername(username: string): boolean {
  return /^[a-z0-9._]{3,30}$/i.test(username.trim())
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6
}

export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0
}
