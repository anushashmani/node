const { todo: Todo, todoItems: TodoItems } = require("../models/index.js");

const createTodoCategory = async (data) => {
  try {
    const newTodo = new Todo({ name: data.name, createdBy: data.uid });
    const response = await newTodo.save();
    return response;
  } catch (error) {
    throw error;
  }
};

const getTodoCategoryById = async (todoId) => {
  try {
    const response = await Todo.findById(todoId).populate([
      "createdBy",
      "todoList",
    ]);

    return response;
  } catch (error) {
    throw response;
  }
};

const createTodoListItems = async (data) => {
  try {
    console.log("dataUID", data.uid);
    const newTodoListItem = new TodoItems({ ...data });
    const response = await newTodoListItem.save();
    return response;
  } catch (error) {
    throw error;
  }
};
// const getTodoListItems = async (todoListId) => {
//   try {
//     // console.log("dataUID", data.uid);
//     // const newTodoListItem = new TodoItems({ ...data });
//     // const response = await newTodoListItem.save();
//     const newTodoListItem = await TodoItems.findById(todoListId);
//     return newTodoListItem;
//     // return response;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  createTodoCategory,
  getTodoCategoryById,
  createTodoListItems,
  // getTodoListItems,
};
