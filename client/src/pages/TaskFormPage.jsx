import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, getTask, updateTask } = useTasks();
  // console.log(tasks);

  const navigate = useNavigate();
  const params = useParams();

  dayjs.extend(utc);

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit( async (data) => {
    // console.log({ ...data, date: dayjs.utc(data.date).format() });

    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      await updateTask(params.id, dataValid);
    } else {
      await createTask(dataValid);
    }

    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4  py-2 rounded-md my-2"
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-zinc-700 text-white px-4  py-2 rounded-md my-2"
            rows="3"
            name="description"
            placeholder="Description"
            {...register("description")}
          ></textarea>
          <input
            className="w-full bg-zinc-700 text-white px-4  py-2 rounded-md my-2"
            type="date"
            {...register("date")}
          />
          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
