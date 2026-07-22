import React, { useState } from 'react'
import Task from './Task'

const App = () => {
  //display
  const [data, setData] = useState("")
  //input value
  const [change, setChange] = useState([])

  const changeName = (e) => {
    setData(e.target.value)
  }

  const summit = (e) => {
    e.preventDefault()

    setChange([...change, data]);
    setData("") // Clear the input after adding
  };

  return (
    <>
    <h1>Task-3</h1>
      <form>{change.map((e, i) => (
          <h2 key={i}>{e}</h2>
        ))}

        <input type="text" value={data} onChange={changeName} placeholder="Enter Technology" /> <br /> <br />
     <button onClick={summit}>Click</button>
      </form>
      <Task/>
    </>
  )
}

export default App