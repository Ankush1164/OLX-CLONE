import Home from './Components/Home'
import { useEffect, useState } from 'react'
import WelcomePage from './Components/WelcomePage';
import "/utility.css"


function App() {
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    {loading ? (<WelcomePage/>):(<Home/>)}

    </>
  )
}

export default App
