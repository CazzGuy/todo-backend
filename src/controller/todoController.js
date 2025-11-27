import todoSchema from "../modals/todoModels.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const data = await todoSchema.create({ title });

    if (data) {
      return res.status(201).json({
        sucess: true,
        message: "Todo is created",
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Todo is not created",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await todoSchema.find({});

    if (data) {
      return res.status(201).json({
        sucess: true,
        message: "Todo fetched Successfully",
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Todo fetching is Unsuccessfully",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todoId = req.params.id;
    console.log(todoId);
    const data = await todoSchema.findOne({ _id: todoId });
    console.log(data);

    if (!data) {
      return res.status(404).json({
        sucess: false,
        message: error.message,
        data,
      });
    }

    data.title = title;
    await data.save();
    return res.status(201).json({
      sucess: true,
      message: "Todo updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Todo update is unsuccessfully",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await todoSchema.findByIdAndDelete({ _id: todoId });
    if (data) {
      return res.status(201).json({
        sucess: true,
        message: "Todo deleted Successfully",
        data,
      });
    } else {
      return res.status(404).json({
        sucess: false,
        message: "Data cannot be found",
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: message.error,
    });
  }
};
