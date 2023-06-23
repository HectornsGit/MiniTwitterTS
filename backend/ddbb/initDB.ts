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
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS tweets`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    //To do: crear la tabla de users.
    //To do: crear la tabla de tweets.
    //To do: crear la tabla de comments.
    //To do: crear la tabla de likes.
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operación terminada");
  }
}

main;
