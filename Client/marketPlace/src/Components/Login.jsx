import React, { useState } from 'react'
import loginImage from "../Assest/loginImage.jpg"
import welcomeLogo from "../Assest/loginLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const userLogin = await fetch("http://localhost:4000/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await userLogin.json();
      if (data.message) {
        console.log(data.data)
        toast.success(data.message);
        if (data.token) {
          localStorage.setItem("TOKEN", data.token)
          localStorage.setItem("UserId", data.userId)
          localStorage.setItem("UserData", JSON.stringify(data.data))
        }
        navigate("/");
      } else {
        toast.error(data.error);
      }
    }
    catch (er) {
      console.error(er)
      alert("Server Error")
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-2/4">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Welcome to our transformative online exchange platform, where security meets convenience, and your financial aspirations find their ideal match. Seamlessly navigate a world of diverse transactions, from currencies to cryptocurrencies, empowered by cutting-edge technology ensuring robust security protocols. Experience efficiency redefined with our user-centric interface, delivering lightning-fast exchanges tailored to your needs.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLogin} className="btn btn-primary">Login</button>
              </div>
              <Link to={"/register"}><p className="label-text-alt link link-hover text-center text-md">New Here</p></Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login


