import React from 'react';
import { useForm } from 'react-hook-form';

const TaskDetailModel = ({ show, onClose, mode, task, handleSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      _id : task._id
    }
  });

  const onSubmit = (data) => {
    handleSave(data);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full p-4">
      <div className="relative top-20 mx-auto p-5 border w-full sm:w-2/3 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-semibold">{mode === 'edit' ? 'Edit Task' : 'Task Details'}</h3>
        
        {mode === 'edit' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
            </div>
            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className='mt-2 flex flex-col gap-4'>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Created at:</strong> {task.createdAt}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModel;
