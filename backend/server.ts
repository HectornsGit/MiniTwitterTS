import * as dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";

const { PORT } = process.env;

const app: express.Application = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(fileUpload());

app.use(express.static("uploads"));
