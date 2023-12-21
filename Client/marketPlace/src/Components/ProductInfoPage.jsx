import { useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Footer from './Footer';

function ProductInfoPage() {
    const [pDetails , setpDetails] = useState([])
    const [user , setUser] = useState("")
      const params = useParams()
      useEffect(()=>{
        fetch("http://localhost:4000/api/get-product/" + params.id , {
          method:"GET"
        })
        .then((res)=>{
          console.log(res)
          if(res.ok){
            return res.json()
          }else{
            console.log("error in product")
          }
        })
        .then((data)=>{
          if(data.product){
            setpDetails(data.product)
          }
        }).catch(()=>{
          alert("Error in productInfo")
        })
      },[])

      const showOwnerDetails = (addedBy) => {
        const url = `http://localhost:4000/api/getUserInfo/${addedBy}`;
      
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Error in product');
            }
            return res.json();
          })
          .then((data) => {
            if (data.user) {
              console.log(data.user);
              setUser(data.user);
            }
          })
          .catch((error) => {
            console.error(error);
            alert('Error in productInfo');
          });
      };
      
      
  return (
    <>
    <Header/>
    <div className='w-full bg-violet-100  flex gap-5 justify-center p-2 product_Info ' style={{height:"87vh"}}>
      <div className='w-2/5  h-full flex bg-red-500 p_Images'>
        <div className='w-full h-full rounded-md overflow-x-hidden flex flex-col scroll_hidden images_PINfo'>
          <img src={"http://localhost:4000/" + pDetails.photo1} alt="" className='w-full rounded-md' style={{ filter: 'brightness(110%)' }}/>
          <img src={"http://localhost:4000/" + pDetails.photo2} alt="" className='w-full rounded-md mt-2' style={{ filter: 'brightness(110%)' }}/>
        </div>
      </div>
      <div className='w-2/4 bg-violet-200 rounded-md shadow-lg h-full flex flex-col overflow-y-scroll scroll_hidden pl-3 product_details'>
        <p className='text-xl border-b-2 p-2'>Product Details...</p>
        <p className='text-2xl font-semibold p-2'>{pDetails.productTitle}</p>
        <p className='p-2'>{pDetails.pDesc}</p>
        <p className='p-2 text-lg font-semibold font-mono'>₹ {pDetails.pPrice}</p>
        <p className='p-2'>Condition:- {pDetails.productCondition}</p>
        <div className='bg-violet-100 rounded-md w-72 h-24 drop-shadow-lg mt-5 ml-2 flex flex-col gap-2 pl-2'>
          <p className='underline font-semibold'>Address</p>
          <p>{pDetails.pAddress}</p>
        </div>

        {/* Owner info button */}
        <div className='w-72 ml-3 mt-5'>
          <button onClick={() => {showOwnerDetails(pDetails && pDetails.addedBy)}} className='bg-violet-400 px-2 py-2 rounded-md font-semibold'>See owner Contact <ArrowDropDownIcon/></button>
          <div className='py-2 flex flex-col gap-2 mt-3'>
          <p className='font-semibold'>Owner-Name: <span className='text-green-800'>{user && user.userName}</span></p>
          <p className='font-semibold'>Owner-ContactNo: <span className='text-green-800'>{user && user.contactNo}</span></p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ProductInfoPage;
