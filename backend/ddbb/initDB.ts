import * as mysql from "mysql2/promise";
import getConnection from "./getConnection";

async function main(): Promise<void> {
  let connection: mysql.Connection | void;
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

    //To do: crear la tabla de users.
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

    //To do: crear la tabla de tweets.
    await connection.query(`CREATE TABLE IF NOT EXISTS entries(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      parent_entry_id int UNSIGNED,
      FOREIGN KEY(parent_entry_id) REFERENCES entries_id,
      FOREIGN KEY(user_id) REFERENCES users(id),
      text VARCHAR(280) NOT NULL,
      pictures VARCHAR(100),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    //To do: crear la tabla de likes.
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