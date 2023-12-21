import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import "/utility.css"

function LeftSideBar(props) {
  const [userinfo, setUserinfo] = useState(null)
  const handleLogout = () => {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("UserData")
    toast.success("User logout successfully")
    window.location.reload();
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserData"));
    setUserinfo(userInfo);
  }, [])

  const tokenKey = localStorage.getItem("TOKEN")
  return (
    <>
      <ToastContainer />
      <div className="bg-violet-100 h-full w-72 p-2 flex flex-col border-r-2 left_Side border-violet-300">
        {/* User Name or user Image field */}
        <div className=' w-full h-16 flex items-center gap-2 p-3 border-b'>
          <div className='bg-black h-12 w-12 rounded-md'></div>
          <div className='h-12 w-36 flex flex-col'>
            {userinfo && userinfo.userName ? (
              <h1 className='text-lg'>{userinfo.userName}</h1>
            ) : (
              <h1 className='text-lg'>User_Name</h1>
            )}

          </div>
        </div>
        {/*Search field  */}
        <div className='w-full h-16 flex items-center justify-around gap-1 '>
          <input type="text"
            value={props && props.search}
            onChange={((e) => { props.handleSearch && props.handleSearch(e.target.value) })}
            placeholder="Search here..."
            className='h-9 w-48 rounded-md p-1 outline-none pl-2 border border-slate-400' />
          <button className='bg-violet-300 px-4 h-9 rounded-md' onClick={() => props.handleClick && props.handleClick()}>Search</button>
        </div>

        {/* Other links to see more about MarketPlace */}
        <div className=' w-full h-full flex flex-col pl-3'>
          <h2 className='text-lg mt-8 text-slate-600'>Your Activity..</h2>
          <ul className='w-full mt-3'>
            <li className='flex flex-col gap-6 text-md font-mono font-semibold border-b pb-5'>
              <Link to={"/"}><HomeIcon /> Home</Link>
              <a href=""><CategoryIcon /> Catagories</a>
              <Link to={"/ContactUs"}><MailIcon /> Contact Us</Link>
              {tokenKey ? (
                <>
                  <Link to={"/likedProducts"}><FavoriteBorderIcon /> Liked Items</Link>
                  <Link to={"/MyProducts"}><FavoriteBorderIcon /> My Products</Link>
                </>
              ) : (
                <>
                  <Link to={"/login"}><FavoriteBorderIcon /> Liked Items</Link>
                  <Link to={""}><BookmarkIcon /> My Products</Link>
                </>
              )}

            </li>
          </ul>
        </div>
        <div className=' w-full flex items-center justify-around mb-2'>
          <Link to={"/register"}><button className='bg-black text-white rounded-md px-3 py-2 font-semibold'>Create Account</button></Link>
          {
            !localStorage.getItem("TOKEN") ?
              <Link to={"/login"}><button className='bg-orange-500 rounded-md px-5 py-2 font-semibold'>Login</button></Link> :
              <button onClick={handleLogout} className='bg-red-500 px-5 py-2 rounded-md font-semibold'>Logout</button>
          }
        </div>
      </div>
    </>
  )
}

export default LeftSideBar