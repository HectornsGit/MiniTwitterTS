import dotenv = require("dotenv");
import express = require("express");
import fileUpload = require("express-fileupload");
import morgan = require("morgan");
import cors = require("cors");

dotenv.config();
const { PORT } = process.env;
const app: express.Application = express();

//------------Middlewares imprescindibles------------//

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(fileUpload());

app.use(express.static("uploads"));
//------------- Middlewares de usuario ------------------//
import getConnection from "./ddbb/getConnection";
import mysql = require("mysql2/promise");
import bcrypt = require("bcrypt");

app.post("/users", async (req: express.Request, res: express.Response) => {
  const { email, username, password } = req.body;
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
});

//----- Middelwares de error y ruta no encontrada-------//.

interface ErrorResponse {
  status: number;
  message: string;
}

app.use(
  (
    err: ErrorResponse,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    console.error(err);

    res.status(err.status || 500).send({
      status: "error",
      message: err.message,
    });
  }
);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
