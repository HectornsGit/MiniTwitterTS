"use strict";
import express = require("express");

import { insertUserQuery } from "../../ddbb/queries/insertUserQuery";

import { iUser } from "../../interfaces/users";

export const newUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const newUser: iUser = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    await insertUserQuery(newUser);

    res.send({
      status: "ok",
      message: "Usuario creado.",
    });
  } catch (err) {
    next(err);
  }
};
