"use strict";

import express = require("express");

import { insertUserQuery } from "../../ddbb/queries/insertUserQuery";

export const newUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    await insertUserQuery(email, username, password);

    res.send({
      status: "ok",
      message: "Usuario creado.",
    });
  } catch (err) {
    next(err);
  }
};
