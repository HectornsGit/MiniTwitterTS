"use strict";
import express = require("express");

import { insertUserQuery } from "../../ddbb/queries/users/insertUserQuery";

import { iUser } from "../../interfaces/users";
import { iRequest } from "../../interfaces/request";

export const newUser = async (arguments: iRequest): Promise<void> => {
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
