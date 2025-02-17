import { useState, useContext } from "react";
import { createContext } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaks must be within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    setTasks((prevTasks) => [...prevTasks, res.data]);
    // console.log(res);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      // console.log(res);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      // console.log(res);

      if (res.status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      // console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
