import React from 'react'
import TaskColumns from '../components/TaskCoulumns'
import SearchBar from '../components/SearchBar'
import AddTask from '../components/AddTask'

const Dashboard = () => {
  return (
    <div className='p-4 flex flex-col gap-4'>
        {/* Add task */}
        <AddTask/>
        {/* Search and sort Filter */}
        <SearchBar/>
        {/* Tasks columns */}
        <TaskColumns/>
    </div>
  )
}

export default Dashboard