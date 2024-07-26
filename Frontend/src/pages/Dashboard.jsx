import  { useEffect } from 'react'
import TaskColumns from '../components/TaskColumns'
import SearchBar from '../components/SearchBar'
import AddTask from '../components/AddTask'
import axios from 'axios'
import { baseUrl } from '../main'

const Dashboard = () => {

  const getUser = async() =>{
    try {
      const response = await axios.get(`${baseUrl}/auth/login/success`,{
        withCredentials: true
      });
      console.log( response.data)
    }
    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getUser()
  }, [])
  


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