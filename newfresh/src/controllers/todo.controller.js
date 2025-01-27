const {
  createTodoCategory,
  getTodoCategoryById,
  createTodoListItems,
  getTodoListItems,
} = require("../services/todo.service");

const createTodo = async (req, res) => {
  try {
    const { name, uid } = req.body;
    const createTodoResponse = await createTodoCategory({ name, uid });
    return res.status(200).json({
      success: true,
      message: "success",
      data: createTodoResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong", data: null });
  }
};

const getTodoItem = async (req, res) => {
  try {
    const { todoId } = req.body;
    const response = await getTodoCategoryById(todoId);
    return res
      .status(200)
      .json({ success: true, message: "success", data: response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "somthing went wrong", data: null });
  }
};
// const getTodoListItem = async (req, res) => {
//   try {
//     const { todoListId } = req.body;
//     const response = await getTodoListItems(todoListId);
//     return res
//       .status(200)
//       .json({ success: true, message: "success", data: response });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "somthing went wrong", data: null });
//   }
// };

const createTodoListItem = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { name } = req.body;

    const response = await createTodoListItems({ name }); // {_id : oi090909}

    const getTodoCategory = await getTodoCategoryById(todoId);
    if (!getTodoCategory)
      return res.status(500).json({
        success: false,
        message: `Category by ${todoId} not exists`,
        data: null,
      });

    getTodoCategory.todoList.push(response.id);
    await getTodoCategory.save();
    return res
      .status(200)
      .json({ success: true, message: "success", data: response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "somthing went wrong", data: error });
  }
};

module.exports = {
  createTodo,
  getTodoItem,
  createTodoListItem,
  // getTodoListItem,
};
