import express from "express";
import bycrypt from "bcrypt";
import multer from "multer";

import jwt from "jsonwebtoken";
import User from "../model/User.js";
//import todo from "../model/todo.js";
// import { upload } from "../upload.js";
//const upload = multer ({dest: "images/"});

const route = express.Router();

route.post("/login", async (request, response) => {
  try {
    const { fullname, email, password } = request.body;
    const userDetail = await User.findOne({ email: email });
    if (!userDetail)
      return response.status(400).json({ message: "User doesnot exist" });
    const isMatch = await bycrypt.compare(password, userDetail.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Invalid Credentials" });
    }
    //const todo = Todo.find();
    const token = jwt.sign({ userDetail }, "12345");
    delete userDetail.password;

    response.status(200).json({
      token,
      fullName: userDetail.fullname,
      email: userDetail.email,
      //todoList: todo,
    });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

route.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password)
    return res.status(400).json({ message: "please enter all the fields" });
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exist" });
  } else {
    try {
      const salt = await bycrypt.genSalt();
      const passwordHash = await bycrypt.hash(password, salt);

      const newUser = await User.create({
        fullname,
        email,
        password: passwordHash,
      });
      await newUser.save();
      res.status(201).json({ message: "successfully created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

export default route;
