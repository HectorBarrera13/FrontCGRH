export function isUserInstitutionalEmailValid(userInstitutionalEmail: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@correo\.uady\.mx$/;
  return regex.test(userInstitutionalEmail);
}

export function UserInstitutionalEmailNotValid(userInstitutionalEmail: string) {
  return new Error(
    `El correo institucional ${userInstitutionalEmail} no es válido.`
  );
}
