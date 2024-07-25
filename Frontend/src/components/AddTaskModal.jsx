import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosWithCredentials } from '../helpers/apiService';


const AddTaskModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosWithCredentials.post('/task/create-task', data);
      console.log('Task added successfully:', response.data);
      onClose(); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full p-2 border rounded"
              placeholder="Task Title"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label className="text-gray-700">Description</label>
            <input
              {...register('description', { required: 'Description is required' })}
              className="w-full p-2 border rounded"
              placeholder="Task Description"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <label className="text-gray-700">Status</label>
            <select {...register('column', { required: 'Status is required' })} className="w-full p-2 border rounded">
              <option value="todo">TODO</option>
              <option value="inProgress">IN PROGRESS</option>
              <option value="done">DONE</option>
            </select>
            {errors.column && <p className="text-red-500">{errors.column.message}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
