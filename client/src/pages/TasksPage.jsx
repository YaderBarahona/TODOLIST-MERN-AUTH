import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import Taskcard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No Tasks</h1>; 

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <Taskcard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
