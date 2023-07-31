/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */
//Función que nos permite manejar los errores.

import { ErrorResponse } from "./interfaces";

//----------------------------------------------------------------------------------------------------------//
export const generateError = (
  message: string,
  status: number
): ErrorResponse => {
  const error: ErrorResponse = { message, status };
  return error;
};
