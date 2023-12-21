import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

function SellProducts() {
  const [pTitle, setPtitle] = useState('');
  const [pDesc, setPdesc] = useState('');
  const [pPrice, setPprice] = useState('');
  const [pAddress, setPaddress] = useState('');
  const [categories, setCategories] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');

  const navigate = useNavigate()
  const handleSellingData = async () => {
    const formData = new FormData();
    formData.append('categories', categories);
    formData.append('productCondition', productCondition);
    formData.append('productTitle', pTitle);
    formData.append('pDesc', pDesc);
    formData.append('pPrice', pPrice);
    formData.append('pAddress', pAddress);
    formData.append('photo1', photo1);
    formData.append('photo2', photo2);
    formData.append('userId', localStorage.getItem("UserId"))

    const url = "http://localhost:4000/api/sellProduct";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.message, {
              position: "top-center",
              autoClose: 1000
            })
            setTimeout(()=>{
              navigate("/")
            },3000)


          }
        });
    } catch (error) {
      console.error(error);
      alert("Error in saving data");
    }

  }
  return (
    <>
      <ToastContainer />
      <div className='w-full h-screen flex p-5 gap-2 bg-slate-100 sell_Products'>
        <div className=' h-full w-2/4 bg-violet-200 p-4 overflow-scroll scroll_hidden rounded-md inputs_details'>
          <h1 className='text-xl ml-5 mt-5 mb-4 selling_heading'>Enter Selling Details..</h1>

          {/* All inputs */}
          <div className='flex flex-col gap-2 all_inputs formContainer'>

            <div className='w-full p-2 flex gap-5 items-center justify-between categories_sec'>
              {/* Product Categories logic */}
              <div className='flex flex-col gap-2 w-2/4 selection'>
                <label>Select Categories</label>
                <select className='outline-none h-10 rounded-md cursor-pointer'
                  onChange={(e) => { setCategories(e.target.value) }}
                  value={categories} required>
                  <option >Choose</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Furniture">Furniture</option>
                  <option value="House">House</option>
                  <option value="laptop">Laptop</option>
                  <option value="watch">Watch</option>
                </select>
              </div>

              {/* Product condition logic */}
              <div className='flex flex-col gap-2 w-2/5 selection'>
                <label>Select Product Condition</label>
                <select className='outline-none h-10 rounded-md cursor-pointer'
                  required
                  value={productCondition}
                  onChange={(e) => { setProductCondition(e.target.value) }}
                >
                  <option >Tap to select </option>
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>
            </div>

            {/* .................. */}
            <div className='w-full p-2 '>
              <div className='flex flex-col'>
                <label htmlFor="">Product title</label>
                <input type="text"
                  required
                  value={pTitle}
                  onChange={(e) => { setPtitle(e.target.value) }} />
              </div>
            </div>

            {/* ................ */}
            <div className='w-full p-2 '>
              <div className='flex flex-col'>
                <label htmlFor="">Product description</label>
                <input type="text"
                  required
                  value={pDesc}
                  onChange={(e) => { setPdesc(e.target.value) }} />
              </div>
            </div>

            {/* .................. */}
            <div className='w-full p-2 '>
              <div className='flex flex-col'>
                <label htmlFor="">Product Price</label>
                <input type="text"
                  required
                  value={pPrice}
                  onChange={(e) => { setPprice(e.target.value) }} />
              </div>
            </div>

            {/* .................... */}
            <div className='w-full p-2 '>
              <div className='flex flex-col'>
                <label htmlFor="">Product Adress</label>
                <input type="text"
                  required
                  value={pAddress}
                  onChange={(e) => { setPaddress(e.target.value) }} />
              </div>
            </div>

          </div>
        </div>

        {/* Photo upload sec */}
        <div className='bg-violet-200 rounded-md h-full w-2/4 flex gap-4 flex-col p-5 overflow-scroll scroll_hidden justify-center photo_Upload'>
          <div className=' w-full flex flex-col justify-center items-center gap-5 h-56'>
          <input type="file" onChange={(e) => setPhoto1(e.target.files[0])} />
          <input type="file"  onChange={(e) => setPhoto2(e.target.files[0])} />
          </div>

          <div className=' w-full p-2 flex justify-center items-center'>
          <button onClick={handleSellingData} className=' rounded-md py-2 px-14 bg-black text-white'>Submit</button>
          </div>

          </div>
        </div>
        <Footer/>
    </>

  )
}

export default SellProducts