import { useState } from 'react'

type Task = {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const task: Task = { id: crypto.randomUUID(), title: input, completed: false }
    setTasks([...tasks, task])
    // tasks.push(task)
    setInput("")
  }

  function handleCheckboxChange(task: Task) {
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed }
      }
      return t
    }
    ))
  }

  return (
    <>
      <h1>TODOアプリ</h1>
      inputの値: {input}
      {tasks.length > 0 ?
        <>

          <h2>My Task</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" checked={task.completed} onChange={() => {
                  handleCheckboxChange(task)
                }} />
                {task.completed ? <s>{task.title}</s> : task.title}</li>
            ))}
          </ul>
        </>
        : <p>タスクをついかしてください</p>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        <button type='submit'>追加</button>
      </form>
    </>
  )
}

export default App
