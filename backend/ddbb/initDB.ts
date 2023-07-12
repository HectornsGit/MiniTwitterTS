"use strict";

import mysql = require("mysql2/promise");
import getConnection from "./getConnection.js";

async function main(): Promise<void> {
  let connection: mysql.PoolConnection | void;
  try {
    connection = await getConnection;

    if (typeof connection === "undefined") {
      throw new Error("Error en la conexión con la base de datos");
    }

    console.log("Borrando tablas...");
    //BORRADO DE TABLAS
    await connection.query(`DROP TABLE IF EXISTS likes`);
    await connection.query(`DROP TABLE IF EXISTS entries`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Creando tablas...");

    await connection.query(`CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(30) NOT NULL,
        bio VARCHAR(100),
        avatar VARCHAR(200) DEFAULT "default_avatar.png",
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activated BOOLEAN DEFAULT FALSE
        )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS entries(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      parent_entry_id int UNSIGNED,
      FOREIGN KEY(parent_entry_id) REFERENCES entries(id),
      FOREIGN KEY(user_id) REFERENCES users(id),
      text VARCHAR(280) NOT NULL,
      pictures VARCHAR(100),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS likes (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        entry_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (entry_id) REFERENCES entries (id),
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operación terminada");
  }
}

main();
