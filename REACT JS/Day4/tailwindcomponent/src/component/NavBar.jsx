import {Link} from "./Link"


const NavBar = () => {
  return (
    <>

    
   <div className="bg-fuchsia-700 p-5 items-center text-gray-200 flex justify-between   ">
    <Logo/>
    <Link/>
    
    
   </div>

    
    
    </>
  )
}

export default NavBar

const Logo = ()=>{
  return(
    <>
    <div className="mx-10 bg-fuchsia-950 w-25 text-center h-15 flex justify-center items-center rounded-2xl">
      <p>Logo</p>
    </div>
    </>
  )
}