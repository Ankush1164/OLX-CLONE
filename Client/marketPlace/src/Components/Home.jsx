import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import LeftSideBar from '../Components/LeftSideBar';
import Loading from './Loading';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './Footer';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:4000/api/all-Products");
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setProducts(data);
                    }
                    setLoading(false)
                } else {
                    toast.error('failed to fetch Data' ,{
                        position:"top-center",
                        autoClose:1000
                    });
                }
                setLoading(false);
            } catch (error) {
                console.log("error in fetcing data")
            }
            setLoading(false);
        };

        fetchDetails();
    }, []);

    const handleSearch = (value) => {
        setSearch(value)
    }

    const handleClick = () => {
        const filteredProducts = products.filter((item) => {
            if (item.productTitle.includes(search) || item.categories.includes(search)) {
                return item;
            }
        })
        setProducts(filteredProducts)
    }

    const handleLike = (productId) => {
        const userId = localStorage.getItem("UserId")
        console.log({ "ProductId": productId, "UserId": userId })

        const url = "http://localhost:4000/api/like-product"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, productId })
        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    alert("Response is not ok")
                }
                return response.json()
            })
            .then((data) => {
                toast.success("Liked Success", {
                    position: "top-center",
                    autoClose: 1000
                })
            })
            .catch((er) => {
                console.log(er)
                alert("Error in liking Product")
            })
    }

    const productInfo = (id) => {
        navigate("productInfo/" + id)
    }


    return (
        <>
            <ToastContainer />
            <Header />
            <div className="flex w-full" style={{ height: '88vh' }}>
            <LeftSideBar search={search} handleSearch={handleSearch} handleClick={handleClick}/>


                <div className='bg-violet-100 flex-grow flex flex-wrap overflow-y-scroll home_screen'>
                    {loading ? (
                        <Loading />
                    ) : (
                        // Render products when data fetching is complete
                        (products && products.length > 0) ? (
                            products.map((data) => (
                                <div key={data._id} className='w-60 h-fit rounded-md p-1 bg-violet-200 drop-shadow-md show_Products' style={{ margin: '10px' }}>
                                    <div className='w-full h-48 relative like_Button'>
                                        {/* Like Button */}
                                        <div className='text-white w-full p-2 rounded-md absolute z-10 flex justify-end items-center'>
                                            <div className='bg-black p-1 rounded-full'>
                                                <FavoriteIcon className='cursor-pointer' onClick={() => handleLike(data._id)} />
                                            </div>

                                        </div>
                                        <img src={`http://localhost:4000/${data.photo1}`} alt="Product" className='h-full w-full rounded-md ' style={{ filter: 'brightness(110%)' }}/>
                                    </div>
                                    {/* Title and categories */}
                                    <div className='w-full flex items-center justify-between py-1 '>
                                        <p className='text-lg font-semibold truncate'>{data.productTitle}</p>
                                        <p className='bg-violet-100 p-1 rounded-md font-semibold text-xs'>{data.categories}</p>
                                    </div>

                                    <p className='truncate mb-1'>{data.pDesc}</p>

                                    {/* price and moreInfo link */}
                                    <div className='w-full flex items-center justify-between'>
                                        <p className='font-semibold product_Price'>₹ {data.pPrice}</p>
                                        <p onClick={() => productInfo(data._id)} className='underline text-blue-800 cursor-pointer more_info'>More info</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex-grow flex justify-center items-center'><p>No records found🙁</p></div>
                        )

                    )}

                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;
