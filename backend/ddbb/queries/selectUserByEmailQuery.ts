import { generateError } from "../../helpers";
import getConnection from "../getConnection";
import mysql = require("mysql2/promise");

export const selectUserByEmailQuery = async (email: string) => {
  let connection: mysql.PoolConnection | void;
  connection = await getConnection;

  try {
    if (typeof connection === "undefined") {
      throw generateError("Error en la conexión con la base de datos", 500);
    }

    const users = await connection.query(
      `SELECT id, password FROM users WHERE email = ?`,
      [email]
    );

    if (users.length < 1) {
      throw generateError("Email Incorrecto", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};
