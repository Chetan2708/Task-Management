import React, { useState } from 'react';
import AddTaskModal from './AddTaskModal';

const AddTask = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className='w-full bg-primary p-2 rounded sm:w-40 flex flex-col justify-center'>
      <button className='text-white' onClick={openModal}>
        Add Task
      </button>
      <AddTaskModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default AddTask;
