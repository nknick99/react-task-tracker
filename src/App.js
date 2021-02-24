import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


const App = () => {
  const [showAddtask, setshowAddtask] = useState (false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    
    getTasks()
  },[])


  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }


  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //add tasks
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
    
    
    
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }

    // setTasks([ ...tasks, newTask ])
  }

  //Delete Tasks
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id ))
  }


  //Toggle Remainder
  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle,
    remainder: !taskToToggle.remainder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, remainder:
      data.remainder } : task
    
    ))
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd= {() => setshowAddtask(!showAddtask) } 
        showAdd={showAddtask}  />
      
      <Route 
        path='/' 
        exact 
        render={(props) => (
        <> 
          {showAddtask && <AddTask 
          onAdd={ addTask } />}
        {tasks.length >0 ? (
          <Tasks
           tasks={tasks} 
           onDelete = {deleteTask} 
           onToggle = {toggleRemainder} 
          />
          ) : (
          'No Task To Show'
         )}
      
        </>
      )} />

      <Route path='/about' component={About}></Route>
      <Footer />
      
    </div>
    </Router>
  )
}

export default App;
