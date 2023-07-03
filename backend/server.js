"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var fileUpload = require("express-fileupload");
var morgan = require("morgan");
var cors = require("cors");
dotenv.config();
var PORT = process.env.PORT;
var app = express();
//------------Middlewares imprescindibles------------//
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send({
        status: "error",
        message: err.message,
    });
});
app.use(function (req, res) {
    res.status(404).send({
        status: "error",
        message: "Ruta no encontrada",
    });
});
app.listen(PORT, function () {
    console.log("Server listening at PORT: ".concat(PORT));
});
