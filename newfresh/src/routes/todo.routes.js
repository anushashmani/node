const express = require("express");
const {
  createTodo,
  getTodoItem,
  createTodoListItem,
  getTodoListItem,
} = require("../controllers/todo.controller");

const route = express.Router();

route.post("/create-todo", createTodo);
route.get("/get-todo-item/:todoId", getTodoItem);
// route.get("/get-todo-item-list/:todoListId", getTodoListItem);
route.post("/list-item/:todoId/create", createTodoListItem);

module.exports = { route };
