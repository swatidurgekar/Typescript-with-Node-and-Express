import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex(
    (todoItem) => todoItem.id === params.todoId
  );
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "updated todo", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
  if (todoIndex >= 0) {
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    return res.status(200).json({ message: "Delete todo", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

export default router;
