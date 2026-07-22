import { useState } from "react";
import Task from "./Component/Task";

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [userName, setUserName] = useState("")

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    setUserName(inputValue)
  }

  return (
    <>
      <h2>{userName}</h2>

      <input type="text"placeholder="Enter your name" value={inputValue} onChange={handleChange} />
      

<button onClick={handleClick}>Change Name </button>
    
     <Task/>
    </>
   
  )
}

export default App