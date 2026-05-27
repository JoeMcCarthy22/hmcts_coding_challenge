import { useEffect, useState } from 'react'
import logo from './assets/logo.jpg'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks')

      const data = await response.json()

      console.log('API DATA:', data)

      setTasks(data)
    } catch (error) {
      console.error(error)
    }
  }

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [dueDate, setDueDate] = useState('')

const createTask = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        status: 'todo',
        dueDate
      })
    })

    const data = await response.json()

    console.log('Created:', data)

    // refresh list
    fetchTasks()

    // clear form
    setTitle('')
    setDescription('')
  } catch (error) {
    console.error('Error creating task:', error)
  }
}

const deleteTask = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    })

    // refresh list after delete
    fetchTasks()
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const toggleStatus = async (task) => {
  try {
    const newStatus = task.status === 'done' ? 'todo' : 'done'

    await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: newStatus
      })
    })

    fetchTasks()
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

  return (
    <div>
      <img src={logo} alt="Logo" />
      <h1>HMCTS Task Manager</h1>

      <p>Task count: {tasks.length}</p>
      <div
      style={{
        backgroundColor: '#dbeafe',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px'
        }}
        >

      <form onSubmit={createTask}>
      <h2>Create Task</h2>

      <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <input
      type="datetime-local"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      />

      <br />

     <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

      <br />

      <button type="submit">Add Task</button>
      </form>
      </div>

      {tasks.map((task) => (
        <div key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status:{' '}
            <strong
              style={{
                color: task.status === 'done' ? 'darkgreen' : 'red'
                }}
              >
            {task.status}
            </strong>
          </p>
          <button onClick={() => toggleStatus(task)}>
          {task.status === 'done' ? 'Mark as Todo' : 'Mark as Done'}
          </button>

          <p>
            Due: {task.dueDate
            ? new Date(task.dueDate).toLocaleString()
            : 'No due date'}
          </p>

          <button onClick={() => deleteTask(task._id)}>
          Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default App