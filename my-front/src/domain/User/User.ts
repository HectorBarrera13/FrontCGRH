import {
  isUserEmployeeKeyVaid,
  UserEmployeeKeyNotValid,
} from "./UserEmployeeKey";
import {
  isUserInstitutionalEmailValid,
  UserInstitutionalEmailNotValid,
} from "./UserInstitutionalEmail";
import { isUserRFCValid, UserRFCNotValid } from "./UserRFC";

export interface User {
  clave_empleado: string;
  rfc: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  roles: string[];
}

export function ensureUserIsValid({ clave_empleado, rfc, email }: User) {
  if (!isUserEmployeeKeyVaid(clave_empleado)) {
    throw UserEmployeeKeyNotValid(clave_empleado);
  }
  if (!isUserRFCValid(rfc)) {
    throw UserRFCNotValid(rfc);
  }
  if (!isUserInstitutionalEmailValid(email)) {
    throw UserInstitutionalEmailNotValid(email);
  }
}
