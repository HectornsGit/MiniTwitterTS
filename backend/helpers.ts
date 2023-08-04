import path = require("path");
import fs = require("fs/promises");
/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */
//Función que nos permite generar errores con código de error.
//----------------------------------------------------------------------------------------------------------//
import { ErrorResponse } from "./interfaces/errors";

export const generateError = (
  message: string,
  status: number
): ErrorResponse => {
  const error: ErrorResponse = { message, status };
  return error;
};

/**
 * ####################
 * ##  SAVE AVATAR   ##
 * ####################
 */
//Función que nos permite reducir el tamaño de las imágenes y guardarlas.
//----------------------------------------------------------------------------------------------------------//
import sharp = require("sharp");
import { randomUUID } from "crypto";

export const saveAvatar = async (img: any): Promise<string> => {
  const { UPLOADS_DIR } = process.env;

  const uploadsPath: string = path.join(__dirname, UPLOADS_DIR as string);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImage = sharp(img.data);
  sharpImage.resize(180);

  const imageName: string = `${randomUUID()}.jpg`;
  const imagePath = path.join(uploadsPath, imageName);

  await sharpImage.toFile(imagePath);

  return imageName;
};
