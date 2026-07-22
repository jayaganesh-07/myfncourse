import React from 'react'
import Object from './Object'

const App = () => {
const arr = [1,2,3,4,5,6]

//Task-1
const course = "React JS"
//Task-2
const price = 50000
let discount = 5000
//Task-3
const isLogin = true
//Task-4
const profileImage = null
//Task-5
const email = undefined
//Task-6

//Task-7
const hero = ["Vijay","Ajith","Suriya","SK","Dhanush"]
//Task-8
  const student = {
    Name: "Jaya Ganesh",
    Course: "Full Stack",
    Experience: "1 Year",
  };
  //Task-9
   const students = [{
      id: 1,
      name: "Jaya Ganesh",
      course: "React JS",
    },
    {
      id: 2,
      name: "Rahul",
      course: "JavaScript",
    },
    {
      id: 3,
      name: "Priya",
      course: "HTML & CSS",
    },
  ];



  return (
    <>
    <h1>{arr}</h1>
    <div>
      <ol>
        {arr.map((e,i)=>(
            <li key={i}>{e}</li>
        ))}
      </ol>
     
    </div>
    <div>
       <p>{arr.filter ((e)=>e%2===0)}</p>
    </div>
    <div>
       <p>{arr.find ((e)=>2)}</p>
    </div>
    <Object/>
   
    <div>
 <h1>Task-1</h1>
  <h1>{course}</h1>
    </div>

<div>
  <h1>Task-2</h1>
  <h1>{price}</h1>
  <h1>{discount}</h1>

</div>

<div>
  <h1>Task-3</h1>
  <h1>{isLogin? "Welcome User":"Please Login"}</h1>
</div>

<div>
  <h1>Task-4</h1>
  <h1>{profileImage ?? <p>No Image Found</p>}</h1>
</div>

<div>
  <h1>Task-5</h1>
  <h1>{email ?? <p>Email Not Available</p> }</h1>
</div>

<div>
  <h1>Task-6</h1>

</div>
<div>
  <h1>Task-7  </h1>
  <h1>{hero}</h1>
  
   
        {hero.map((e,i)=>(
            <li key={i}>{e}</li>
        ))}
     
     
   
</div>
      <h1>Task-8</h1>
    <div className="flex flex-wrap justify-center gap-6 mt-10 hover:scale-105 transition duration-300"   border rounded-xl    >
      
      <div>
        <p>Name: {student.Name}</p>
        <p>Course : {student.Course}</p>
        <p>Experience : {student.Experience}</p>
     </div>
     </div>



     <h1 >
        Task 9 - Array of Objects Rendering
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {students.map((student) => (
          <div
            key={student.id}
            className="w-64 bg-white border rounded-xl shadow-lg p-5 hover:scale-105 transition duration-300">
            <h2 className="text-xl font-bold text-blue-600">
              ID: {student.id}
            </h2>

            <p className="mt-3 text-lg">
              <span className="font-semibold">Name:</span> {student.name}
            </p>

            <p className="mt-2 text-lg">
              <span className="font-semibold">Course:</span> {student.course}
            </p>
          </div>
        ))}
      </div>
  
     


   
    
   
  




    </>
  )
}

export default App