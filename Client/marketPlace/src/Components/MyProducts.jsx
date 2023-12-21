import React, { useEffect, useState } from 'react';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import Loading from './Loading';
import Footer from './Footer';
function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = { userId: localStorage.getItem('UserId') };
                const response = await fetch('http://localhost:4000/api/myProducts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    if (result && result.data) {
                        setProducts(result.data);
                    }
                setLoading(false)
                } else {
                    throw new Error('Server Error');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className='w-full bg-violet-100 flex' style={{ height: '88vh' }}>
                <LeftSideBar />
                <div className='flex-grow flex my_productsPage'>
                    {loading ? (
                        <Loading />
                    ) : (
                        // Render products when data fetching is complete
                        products && products.length === 0 ? (<div className='flex-grow flex justify-center items-center'><p>No records found🙁</p></div>) : (
                            products.map((data) => (
                                <div key={data._id} className='w-60 h-fit rounded-md p-1 bg-violet-200 my_Products' style={{ margin: '10px' }}>
                                    <div className='w-full h-48 relative'>
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
                                    </div>
                                </div>
                            ))
                        )

                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyProducts;
