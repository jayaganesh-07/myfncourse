import React, { useState } from 'react'

const Task = () => {

    //Task-1
    //input value
    const [inputName,setInputValue]=useState("")
    //display value
    const [name,setName]=useState("") 

    const handleChange=(e)=>{
        setInputValue(e.target.value)
    }
    const handleSumbit=()=>{
        setName(inputName)
    }

    //Task-2
    //input value
    const [inputStudentName,setInputStudentName]=useState("")
    const [inputCourse,SetInputCourse]=useState("")
    //display
    const [studentName,setStudentName]=useState("")
    const [course,setCourse]=useState("")

    const handlestudentChange=(e)=>{
        setInputStudentName(e.target.value)
       

    }
    const handleCourseChange = (e) => {
    SetInputCourse(e.target.value);
}
    const sumbit =()=>{
       setStudentName (inputStudentName)
      setCourse (inputCourse)
    }

    //Task-4
    //input
    const [inputStudent,setInputStudent]=useState("")
    //display
    const [student,setStudent]=useState([])

   const submitted = (e) => {
  e.preventDefault()

  setStudent([...student, inputStudent])
  setInputStudent("")
}


  return (
    <>
    <div>
        <h1>Task-1</h1>
        <h1>{name}</h1>
        <input type="text" placeholder='Enter the Name' value={inputName} onChange={handleChange} /> <br /><br />
        <button onClick={handleSumbit}>Click To Sumbit</button>
    </div>
    <div>
        <h1>Task-2</h1>
        <h1>{studentName}</h1>
        <h1>{course}</h1>
        <input type="text" placeholder='Enter Student Name' value={inputStudentName} onChange={handlestudentChange} /> <br /> <br />
        <input type="text" placeholder='Enter Course' value={inputCourse} onChange={handleCourseChange } /> <br /> <br />
        <button onClick={sumbit}> Sumbit</button>
    </div>

    <div>
        <form>
            <h1>Task-4</h1>
          {student .map((e, i) => (
          <h2 key={i}>{e}</h2>
        ))}
            <input type="text" placeholder='Enter Student Name' value={inputStudent}  onChange={(e)=>setInputStudent(e.target.value)}/>
            <button onClick={submitted}>Click Add Student</button>
        </form>
    </div>
    
    </>
  )
}

export default Task