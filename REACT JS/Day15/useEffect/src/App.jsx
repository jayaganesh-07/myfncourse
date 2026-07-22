
import React, { useState, useEffect } from "react"

const App = () => {
     
  //task-1
  const [counted, setCounted] = useState(0)

  useEffect(() => {
    console.log("Latest Count:", counted)
  }, [counted])
//   let number = 20
//  const interval = ()=>{
//    console.log(number++);

   
//  }
//  interval()

  //task-3
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  //task-4
const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json()

    setUsers(data);
  }

  useEffect(() => {
    fetchUsers()
  }, [])

 

  return (
    <>

 <h1>Task-1</h1>

      <h2>{counted}</h2>

      <button onClick={() => setCounted(counted + 1)}>Increment</button>

    <div>
      <h1>Task-3</h1>
      <h1>{count}</h1>
    </div>
      

      <div>
         <h1>Task-4</h1>

      {users.map((e) => (
        <div key={e.id}>
          <h3>{e.name}</h3>
          <p>{e.email}</p>
        </div>
      ))}
      </div>
    
    </>
  )
}

export default App