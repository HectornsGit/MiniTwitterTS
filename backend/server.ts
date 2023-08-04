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
import { newUser } from "./controllers/users/newUser";
import { ErrorResponse } from "./interfaces/errors";

app.post("/users", newUser);

//----- Middelwares de error y ruta no encontrada-------//.

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
