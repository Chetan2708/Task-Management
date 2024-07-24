import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const tasksData = {
  todo: [
    { id: 1, title: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
    { id: 2, title: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
    { id: 3, title: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
  ],
  inProgress: [
    { id: 4, title: 'Task 4', description: 'Description 4', createdAt: '01/09/2024, 05:30:00' },
    { id: 5, title: 'Task 5', description: 'Description 5', createdAt: '01/09/2021, 05:30:00' },
  ],
  done: [
    { id: 6, title: 'Task 6', description: 'Description 6', createdAt: '01/09/2021, 05:30:00' },
  ],
};

const TaskColumns = () => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row ">
      <Column title="TODO" tasks={tasksData.todo} />
      <Column title="IN PROGRESS" tasks={tasksData.inProgress} />
      <Column title="DONE" tasks={tasksData.done} />
    </div>
  );
};

const Column = ({ title, tasks }) => {
  return (
    <div className="w-full  bg-gray-100 rounded-lg p-4 shadow-md">
      <h2 className="bg-primary text-white text-center py-2 rounded">{title}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-blue-200 p-4 my-2 rounded shadow-sm">
      <h3 className="font-semibold">{task.title}</h3>
      <div className='flex flex-col gap-10'>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">Created at: {task.createdAt}</p>
      </div>
      <div className="flex gap-3 mt-2 ">
        <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        <button className="bg-blue-300 text-white px-2 py-1 rounded">Edit</button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button>
      </div>
    </div>
  );
};

export default TaskColumns;
