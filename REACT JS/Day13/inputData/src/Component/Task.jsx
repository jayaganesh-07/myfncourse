import { useState } from "react"


const Task = () => {

    //Task-1
    const [inputValue,setInputvalue]=useState("")
    const [userName,setUserName]=useState("")
    const handleChange = (e)=>{
        setInputvalue(e.target.value)
    }
    const handleClick = ()=>{
        setUserName(inputValue)
    }

    //Task-2
    //get input to user
    const [nameInput,setNameInput]=useState("")
    const [courseInput,setCourseInput]=useState("")
    //display the input
    const [studentName,setStudentName]=useState("")
    const [course,setCourse]=useState("")

    const handleSubmit =()=>{
        setStudentName(nameInput)
        setCourse(courseInput)
      
    }
    //Task-3
    //input
    const [employeeNameImput,setEmployeeNameInput]=useState("")
    const [departmentInput,setDepartmentInput]=useState("")
    const [salaryInput,setSalaryInput]=useState("")
    //display
    const [employeName,setEmploye]=useState("")
    const [department,setDepartment]=useState("")
    const [salary,setSalary]=useState("")

    const handleSubmited =()=>{
       setEmploye (employeeNameImput)
       setDepartment(departmentInput)
       setSalary(salaryInput)
  }
  //Task-4
//input
const [productInput,setProductInput]=useState("")
const [priceInput,setPriceInput]=useState("")
const [categoryInput,setCategoryInput]=useState("")
  //display
  const [product,setProduct]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("")

  const handleToSubmit =()=>{
    setProduct(productInput)
    setPrice(priceInput)
    setCategory(categoryInput)
  }
  //Task-5
   // Input 
  const [nameeInput, setNameeInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [ageInput, setAgeInput] = useState("")

  // Display 
  const [namee, setNamee] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [age, setAge] = useState("")

  const handledSubmit = () => {
    setNamee(nameeInput)
    setEmail(emailInput)
    setCity(cityInput)
    setAge(ageInput)
  }




  return (
   <>
   <div>
<h1>Task-1</h1>
<h1>{userName}</h1>
<input type="text" placeholder="Enter Name" value={inputValue} onChange={handleChange}/>
<button  onClick={handleClick}>Click Submit</button>
 </div>

 <div>
    <h1>Task-2</h1>
    <h1>Student Name ={studentName}</h1>
    <h1>Course ={course}</h1>
    <input type="text" placeholder="Student Name" value={nameInput} onChange={(e)=> setNameInput(e.target.value)} /> <br /><br />
    <input type="text" placeholder="Course " value={courseInput} onChange={(e)=>setCourseInput(e.target.value)} /> <br /><br />
    <button onClick={handleSubmit} >Click Submit</button>
 </div>
 <div>
<h1>Task-3</h1>
<p>{employeName}</p>
<p>{department}</p>
<p>{salary}</p>
<input type="text" placeholder="Enter Employe Name" value={employeeNameImput} onChange={(e)=>setEmployeeNameInput(e.target.value)}/> <br /><br />
<input type="text" placeholder="Enter the Department" value={departmentInput} onChange={(e)=>setDepartmentInput(e.target.value)} /> <br /><br />
<input type="text" placeholder="Enter the Salary" value={salaryInput} onChange={(e)=>setSalaryInput(e.target.value)}/> <br /> <br />
<button onClick={handleSubmited}>Click Submit</button>
 </div>

 <div>
     <h1>Task-4</h1>
   <div 
     style={{
          border: "1px solid black",
          width: "200px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor:"blue",
          color:"white"
        }}>
            <h1>List</h1>
    
     <p>{product}</p>
      <p>{price}</p>
       <p>{category}</p>
   </div>
       <input type="text" placeholder="Enter the Product" value={productInput}  onChange={(e)=>setProductInput(e.target.value)}/> <br /><br />
        <input type="text" placeholder="Enter the Price" value={priceInput} onChange={(e)=>setPriceInput(e.target.value)} /> <br /><br />
         <input type="text" placeholder="Enter the Category" value={categoryInput}  onChange={(e)=>setCategoryInput(e.target.value)}/> <br /><br />
         <button onClick={handleToSubmit}>Click Submit</button>
    
 </div>
 
      <h1>Task-5</h1>
       <div
        style={{
          width: "280px",
          border: "1px solid black",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h2> <b>User Profile</b> </h2>

        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>City:</b> {city}</p>
        <p><b>Age:</b> {age}</p>
      </div> <br />
  

<input type="text" placeholder="Enter Name" value={nameeInput} onChange={(e) => setNameeInput(e.target.value)} /><br /><br />
<input type="email"  placeholder="Enter Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/> <br /><br />
<input  type="text" placeholder="Enter City" value={cityInput} onChange={(e) => setCityInput(e.target.value)} /> <br /><br />
<input  type="number" placeholder="Enter Age" value={ageInput} onChange={(e) => setAgeInput(e.target.value)}  /> <br /><br />
 <button onClick={handledSubmit}>Submit</button><br /><br />

     
  

   </>
  )
}

export default Task