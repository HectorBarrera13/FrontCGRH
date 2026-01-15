export function isUserEmployeeKeyVaid(userEmployeeKey: string) {
  const regex = /^\d{5}$/;
  return regex.test(userEmployeeKey);
}

export function UserEmployeeKeyNotValid(userEmployeeKey: string) {
  return new Error(`La clave de empleado ${userEmployeeKey} no es válida.`);
}
