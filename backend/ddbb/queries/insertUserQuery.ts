import bcrypt = require("bcrypt");
import mysql = require("mysql2/promise");

import getConnection from "../getConnection";
import { generateError } from "../../helpers";
import { selectUserByEmailQuery } from "./selectUserByEmailQuery";

export const insertUserQuery = async (user: iUser) => {
  const { email, password, username } = user;

  //1: Comprobar si existe un usuario con ese email.
  const existingUser = await selectUserByEmailQuery(email);

  //Código mágico que comprueba si un usuario existe.
  if ((existingUser as Array<any>).length > 0) {
    throw generateError("Usuario ya existente", 403);
  }

  //2: encriptar la contraseña.
  const hashedPassword = await bcrypt.hash(password, 10);

  //3: realizar la petición a la bbdd.
  let connection: mysql.PoolConnection | void;
  connection = await getConnection;

  try {
    if (typeof connection === "undefined") {
      throw new Error("Error en la conexión con la base de datos.");
    }

    await connection.query(
      `INSERT INTO users (email, username, password, registration_date)
             VALUES (?,?,?,?)`,
      [email, username, hashedPassword, new Date()]
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
