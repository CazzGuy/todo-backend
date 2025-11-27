import express from "express";
import {
  createTodo,
  deleteTodo,
  getAll,
  updateTodo,
} from "../controller/todoController.js";

const todoRoutes = express.Router();

todoRoutes.post("/create", createTodo);
todoRoutes.get("/getAll", getAll);
todoRoutes.put("/update/:id", updateTodo);
todoRoutes.delete("/delete/:id", deleteTodo);

export default todoRoutes;
