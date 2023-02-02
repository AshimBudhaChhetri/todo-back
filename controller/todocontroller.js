import { request, response } from "express";
import todo from "../model/todo.js";

export const gettodocontroller = async (request, response) => {
  try {
    const list = await todo.find();
    return response.status(200).json(list);
  } catch (err) {
    return response.status(500).json(err.message);
  }
};
export const posttodocontroller = async (request, response) => {
  try {
    const newTodo = await todo.create({
      value: request.body.value,
      createdAt: Date.now(),
    });
    console.log(newTodo, "How is this possible");
    await newTodo.save();
    return response.status(200).json(newTodo);
  } catch (err) {
    return response.status(500).json(err.message);
  }
};
export const gettodobyid = async (request, response) => {
  const id = request.params.id;
  try {
    const todobyid = await todo.findById(id);
    return response.status(200).json(todobyid);
  } catch (err) {
    console.log(err);
  }
};
export const gettodobyidandupdate = async (request, response) => {
  const id = request.params.id;

  const { value, done = false } = request.body;
  try {
    const todoupdatebyid = await todo.findByIdAndUpdate(id, {
      value,
      done,
    });
    console.log(todoupdatebyid, "this is to update");
    await todoupdatebyid.save();
    return response.status(200).json({
      statuscode: 200,
      message: "successfully updated",
    });
  } catch (err) {
    console.log(err);
  }
};
export const gettodobyidanddelete = async (request, response) => {
  const id = request.params.id;
  try {
    await todo.findByIdAndDelete(id);
    return response.status(200).json({
      message: "successfully deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
