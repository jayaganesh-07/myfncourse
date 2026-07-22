import './App.css'
import Banner from './Reactproject/Banner'




const App =()=>{
  return(
    <>
   <div className='class'>
     <div className="parent">
      <img src="./public/favicon.svg" alt="" />
      
    </div>
    <div className='navbar'>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">Login</a>
    </div>
   </div>
    <Banner/>
    </>
  )
}
export default App