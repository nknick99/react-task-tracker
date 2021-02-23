import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks'


const App = () => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 28 at 2.30pm',
        remainder: true,
    },
    
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Mar 2 at 12.30pm',
        remainder: true,
    },
    
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Mar 8 at 11.00am',
        remainder: false,
    },
])


  //Delete Tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
  }


  //Toggle Remainder
  const toggleRemainder = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, remainder:
      !task.remainder } : task
    
    ))
  }

  return (
    <div className="container">
      <Header />
      {tasks.length >0 ? (
         <Tasks tasks={tasks} onDelete = {deleteTask} 
         onToggle = {toggleRemainder} />
      ) : (
        'No Task To Show'
      ) }
     
      
      
    </div>
  )
}

export default App;
