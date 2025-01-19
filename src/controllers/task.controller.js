import taskModel from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({
        user: req.user.id,
      })
      .populate("user");
    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req, res) => {
  try {
    // console.log(req.user);

    const { title, description, date } = req.body;

    const newTask = new taskModel({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id).populate("user");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Something went wrong" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Something went wrong" });
  }
};
