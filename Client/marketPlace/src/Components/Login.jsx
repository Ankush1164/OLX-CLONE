import React, { useState } from 'react'
import loginImage from "../Assest/loginImage.jpg"
import welcomeLogo from "../Assest/loginLogo.png"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email ,setEmail] = useState("")
  const [password , setPassword]= useState("")

  const navigate = useNavigate()

  const handleLogin = async()=>{
    try{
        const userLogin = await fetch("http://localhost:4000/api/login" ,{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:email,
            password:password
          })
          })
          const data = await userLogin.json();
          if (data.message) {
            console.log(data.data)
              toast.success(data.message);
              if(data.token){
                localStorage.setItem("TOKEN" , data.token)
                localStorage.setItem("UserId" , data.userId)
                localStorage.setItem("UserData", JSON.stringify(data.data))
              }
              navigate("/");
          } else {
              toast.error(data.error);
          }
    }
    catch(er){
      console.error(er)
      alert("Server Error")
    }
  }
  return (
    <>
    <ToastContainer/>
      <div className='w-full h-screen flex items-center justify-center p-8'>
        <div className='bg-violet-200 h-full w-11/12 rounded-md flex drop-shadow-lg'>
          {/* login form sec */}
          <div className='w-2/4 h-full p-2'>
            <div className='flex w-full h-full  flex-col'>
              {/* welcome back logo Sec */}
              <div className='w-full flex items-center justify-center'>
                <img src={welcomeLogo} alt="" className='h-52 w-52' />
              </div>

              {/* form control sec */}

              <div className='w-full -mt-4 h-fit p-5 flex flex-col items-center gap-4 login_inputField'>
                  <input type="email"
                   placeholder='abc@gmail.com'
                   value={email}
                   onChange={(e)=> setEmail(e.target.value)}
                   />
                  <input type="password" 
                  placeholder='********'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  />
                  <button onClick={handleLogin} className='bg-orange-400 px-8 py-2 rounded-md'>Login</button>
                  <div className='flex p-2 flex-col justify-center items-center'>
                  <p className='text-blue-600 underline cursor-pointer'>Forgot Password</p>
                  <p className='cursor-pointer'>Back to home</p>
                  </div>

              </div>
            </div>
          </div>


          {/* login photo sec */}
          <div className='w-4/5 p-4 drop-shadow-lg h-full flex items-center'>
            <img src={loginImage} alt="" className='h-full w-full'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login