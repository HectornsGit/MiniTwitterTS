import getConnection from "../../getConnection";
import mysql = require("mysql2/promise");
import { generateError } from "../../../helpers";

const selectUserByIdQuery = async (idUser: number) => {
  let connection: mysql.PoolConnection | void;
  connection = await getConnection;

  try {
    if (typeof connection === "undefined") {
      throw generateError("Error en la conexión con la base de datos", 500);
    }

    //Seleccionamos al usuario segun su id en la base de datos.
    const [users] = await connection.query(
      `SELECT id, email, avatar, bio, password, username, registration_date FROM users WHERE id = ?`,
      [idUser]
    );

    //Lanzamos un error si no se encuentra al usuario con ese id
    if ((users as Array<any>).length > 1) {
      throw generateError("Usuario no encontrado", 404);
    }

    //Devuelve al usuario seleccionado segun su id.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
