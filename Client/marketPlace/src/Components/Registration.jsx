import React, { useState } from 'react'
import { Link,  useNavigate } from "react-router-dom"
import registerImage from "../Assest/registerImage.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {
    const [userName, setuserName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [address, setaddress] = useState("")
    const [contactNo, setcontactNo] = useState("")

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const signUpApi = await fetch("http://localhost:4000/api/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                    address: address,
                    contactNo: contactNo
                })
            })
            .then((res)=> res.json())
            .then((data)=>{
                if(data.error){
                    toast.warn(data.error)
                }
                else{
                    toast.success(data.message)
                    setTimeout(()=>{
                        navigate("/login")
                    },2000)
                    
                }
            })
        }
        catch (err) {
            console.log(err)
            alert("server Error")
        }
    }
    return (
        <>
        <ToastContainer/>
            <div className='w-full h-screen flex items-center justify-center p-8'>
                <div className='w-11/12 h-full bg-violet-200 rounded-md drop-shadow-lg flex items-center justify-between'>
                    {/* userForm box */}
                    <div className='bg-transparent w-2/4 h-full flex items-center justify-center p-2'>
                        <div className='w-full h-full flex flex-col'>
                            {/* User Profile View box */}
                            <div className='w-full h-36 flex items-center justify-center p-2'>
                                <div className='bg-black h-32 w-32 rounded-full'></div>
                            </div>

                            {/* Form conatiner start */}
                            <div className='h-full gap-1 flex flex-col w-11/12 m-auto'>
                                <div className='flex items-center justify-around p-2 input_box'>
                                    <input type="text"
                                        placeholder='Enter Name'
                                        value={userName}
                                        onChange={(e) => setuserName(e.target.value)}
                                    />

                                    <input type="text"
                                        placeholder='Enter Email'
                                        value={email} onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>

                                <div className='flex items-center justify-around p-2 input_box'>
                                    <input type="text"
                                        placeholder='Contact No'
                                        value={contactNo}
                                        onChange={(e) => setcontactNo(e.target.value)}
                                    />

                                    <input type="text"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>

                                <div className='flex items-center justify-around p-2 adress_box'>
                                    <input type="text"
                                        placeholder='Enter Address'
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                    />
                                </div>

                                <div className='flex items-center justify-around p-2 file_box'>
                                    <input type="file" />
                                </div>


                                <div className='flex items-center justify-around'>
                                    <button onClick={handleSubmit} className='bg-black p-2 text-white w-11/12'>Create Account</button>
                                </div>
                            </div>
                            {/* Return and login links */}
                            <div className='w-full p- flex items-center justify-center flex-col gap-2'>
                           <Link to={"/"}><p className='text-sm cursor-pointer'>Back to home</p></Link> 
                            
                            <Link  to={"/login"}><p className='text-blue-600 text-sm underline cursor-pointer'>Already Account</p></Link>
                            </div>
                        </div>
                    </div>

                    {/* Registration box and image */}
                    <div className='bg-transparent w-2/4 h-full p-5'>
                        <div className='w-full h-full'>
                            <img src={registerImage} alt="" className='h-full w-full rounded-md drop-shadow-md' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Registration