"use strict";

import express = require("express");
import mysql = require("mysql2/promise");
import getConnection from "../../ddbb/getConnection";
import bcrypt = require("bcrypt");
import { selectUserByEmailQuery } from "../../ddbb/queries/selectUserByEmailQuery";

export const newUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await selectUserByEmailQuery(email);

    if (existingUser) {
      throw new Error("Usuario ya existente");
    }

    //to do: registrar un usuario.
    //1: aplicar esquemas de Joi.

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
    } catch (err: any) {
      console.error(err.message);
    } finally {
      if (connection) {
        connection.release();
      }
    }
    //3: devolver la respuesta.
    res.send({
      status: "ok",
      message: "Usuario creado.",
    });
  } catch (err) {
    next(err);
  }
};
