
import img from '../assets/1.png'
import img1 from '../assets/vijay.jpg'

const Banner =()=>{
    return(
        <>
        <div>
            <img src= {img} alt=""   width={1520} height={400} />
            </div>
            
            <div className='vijay'>
                <img src={img1}/>
                <h2>Name: Vijay</h2>
                <h2>Age: 52</h2>
            </div>
            </>
    )
}
export default Banner
