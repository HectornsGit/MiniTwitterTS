import getConnection from "../getConnection";
import mysql = require("mysql2/promise");

export const selectUserByEmailQuery = async (email: string) => {
  let connection: mysql.PoolConnection | void;
  connection = await getConnection;

  try {
    if (typeof connection === "undefined") {
      throw new Error("Error en la conexión con la base de datos");
    }

    const users = await connection.query(
      `SELECT id, password FROM users WHERE email = ?`,
      [email]
    );

    if (users.length < 1) {
      throw new Error("Email Incorrecto");
    }
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};
