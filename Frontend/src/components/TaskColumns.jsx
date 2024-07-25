import React, { useState, useEffect } from 'react';
import { axiosWithCredentials } from '../helpers/apiService';
import TaskCard from './TaskCard';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskColumns = () => {
    const [tasksData, setTasksData] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosWithCredentials.get("/task/get-tasks");
                const tasks = response.data.data;
                const transformedTasks = {
                    todo: tasks.filter(task => task.column === 'todo'),
                    inProgress: tasks.filter(task => task.column === 'inProgress'),
                    done: tasks.filter(task => task.column === 'done')
                };

                setTasksData(transformedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleDrop = async (task, newColumn) => {
       
        const updatedTasksData = { ...tasksData };
        const oldColumn = task.column;

       
        updatedTasksData[oldColumn] = updatedTasksData[oldColumn].filter(t => t._id !== task._id);

        
        task.column = newColumn;
        updatedTasksData[newColumn].push(task);

        setTasksData(updatedTasksData);

       
        await axiosWithCredentials.put(`/task/update-task-column/${task._id}`, { column: newColumn })
            .catch(error => console.error('Error updating task column:', error));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex gap-4 flex-col lg:flex-row">
                {Object.entries(tasksData).map(([columnId, tasks]) => (
                    <Column
                        key={columnId}
                        title={columnId.toUpperCase()}
                        tasks={tasks}
                        columnId={columnId}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

const Column = ({ title, tasks, columnId, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item, columnId),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`w-full bg-gray-100 rounded-lg p-4 shadow-md  ${isOver ? 'bg-blue-100' : ''}`}
        >
            <h2 className="bg-primary text-white text-center py-2 rounded">{title}</h2>
            {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
            ))}
        </div>
    );
};

export default TaskColumns;
