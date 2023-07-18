import "./styles.css"
import { useState } from "react"


export default function App() {

  // value and function for updating our value
  // hooks up to input
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

}

// returning the excat output of what somthing is going to look like
return (
  <>
    <h1 className="Header">What are you postponing today?</h1>
    <form onSubmit={handleSubmit}
      className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add Task</button>
    </form>

    <h1 className="Header">Current Tasks</h1>
    <ul className="header">
      <li>
        <label>
          <input type="checkbox" /><button className="btn btn-danger">Delete</button>
        </label>
      </li>
    </ul>
  </>

);
}