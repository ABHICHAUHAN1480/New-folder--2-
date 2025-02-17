import { useState } from 'react'
import Navbar from './componenets/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-black'>
      <Navbar/>
       
        Click on the Vite and React logos to learn more
    </div>
    </>
  )
}

export default App
