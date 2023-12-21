import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Person3Icon from '@mui/icons-material/Person3';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <div className='footer_Setting'>
        <Link to={"/"}><HomeIcon/></Link>
        <Link to={"/likedProducts"}><FavoriteIcon/></Link>
        <div className='w-12 h-12 z-10 -mt-5 bg-violet-400 rounded-full flex items-center justify-center'>
            <Link to={"/sell"}><AddIcon/></Link>
        </div>
        <Link to={"/MyProducts"}><LocalMallIcon/></Link>
        <Person3Icon />

    </div>
    </>
  )
}

export default Footer