export function isUserRFCValid(userRFC: string) {
  const regex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
  return regex.test(userRFC);
}

export function UserRFCNotValid(userRFC: string) {
  return new Error(`El RFC ${userRFC} no es válido.`);
}
