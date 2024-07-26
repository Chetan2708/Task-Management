import React, { useState } from 'react';
import TaskDetailModel from './TaskDetailModel';
import { axiosWithCredentials } from '../helpers/apiService';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, index }) => {
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('view');

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleSave = async (updatedTask) => {
        try {
            await axiosWithCredentials.put(`/task/update-task/${updatedTask._id}`, updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axiosWithCredentials.delete(`/task/delete-task/${id}`);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <>
            <div
                ref={drag}
                className={`bg-blue-200 p-4 my-2 rounded shadow-sm ${isDragging ? 'opacity-50' : ''}`}
            >
                <h3 className="font-semibold">{task.title}</h3>
                <div className="flex flex-col gap-10">
                    <p>{task.description}</p>
                    <p className="text-sm text-gray-600">Created at: {task.createdAt}</p>
                </div>
                <div className="flex gap-3 mt-2">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-300 text-white px-2 py-1 rounded"
                        onClick={() => {
                            setMode('edit');
                            setShowModal(true);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-primary text-white px-2 py-1 rounded"
                        onClick={() => {
                            setMode('view');
                            setShowModal(true);
                        }}
                    >
                        View Details
                    </button>
                </div>
            </div>

            <TaskDetailModel
                show={showModal}
                onClose={() => setShowModal(false)}
                mode={mode}
                task={task}
                handleSave={handleSave}
            />
        </>
    );
};

export default TaskCard;
