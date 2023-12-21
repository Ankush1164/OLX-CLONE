import React, { useEffect, useState } from 'react'
import Header from './Header'
import LeftSideBar from './LeftSideBar'
import Loading from './Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
function LikedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            try {
                const data = {userId : localStorage.getItem('UserId')}
                const response = await fetch("http://localhost:4000/api/likedProducts",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    if (result) {
                        setProducts(result.products);
                    }
                    setLoading(false)
                } else {
                    throw new Error('Server Error');
                }
                setLoading(false);
            } catch (error) {
                alert("Error");
                console.log("Error in fetch")
            }
        };

        fetchDetails();
    }, []);

    let userId = localStorage.getItem("UserId")
    const handleDelete = async (userId, productId) => {

        try {
          const response = await fetch(`http://localhost:4000/api/likedProducts/${userId}/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
      
          if (response.ok) {
            // Handle success (maybe update UI or state)
            toast.success('Product removed from liked list',{
                position:"top-center",
                autoClose:1000
            });
          } else {
            throw new Error('Delete request failed');
          }
        } catch (error) {
          console.error('Error removing product:', error);
          toast.error('Failed to remove product from liked list');
        }
      };

    return (
        <>
            <Header />
            <div className='w-full flex' style={{ height: "88vh" }}>
                <LeftSideBar />
                <div className='flex-grow flex bg-violet-100'>
                    {loading ? (
                        <Loading />
                    ) : (
                        // Render products when data fetching is complete
                        products && products.length === 0 ? (<div className='flex-grow flex justify-center items-center'><p>No records found🙁</p></div>) : (
                            products.map((data) => (
                                <div key={data._id} className='w-60 h-fit rounded-md p-1 bg-violet-200' style={{ margin: '10px' }}>
                                    <div className='w-full h-48 relative'>
                                        {/* Like Button */}
                                        <div className='text-white w-full p-2 rounded-md absolute z-10 flex justify-end items-center'>
                                            <div className='bg-black p-1 rounded-full'>
                                                <DeleteIcon className='cursor-pointer' onClick={() => handleDelete(userId, data._id)} />
                                            </div>

                                        </div>
                                        <img src={`http://localhost:4000/${data.photo1}`} alt="Product" className='h-full w-full rounded-md' />
                                    </div>
                                    {/* Title and categories */}
                                    <div className='w-full flex items-center justify-between py-1 '>
                                        <p className='text-lg font-semibold'>{data.productTitle}</p>
                                        <p className='bg-violet-100 p-1 rounded-md font-semibold text-xs'>{data.categories}</p>
                                    </div>

                                    <p className='truncate mb-1'>{data.pDesc}</p>

                                    {/* price and moreInfo link */}
                                    <div className='w-full flex items-center justify-between'>
                                        <p className='font-semibold'>{data.pPrice}</p>
                                        <Link to={`/productInfo`}
                                            props={data}
                                        ><p className='underline text-blue-800 cursor-pointer'>More info</p></Link>
                                    </div>
                                </div>
                            ))
                        )

                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LikedProducts