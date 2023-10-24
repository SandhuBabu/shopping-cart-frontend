import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='p-12 flex flex-col gap-8'>
      <h1 className="text-3xl font-bold text-purple-500">Vite + React</h1>
      <button
        onClick={() => setCount((count) => count + 1)}
        className='btn btn-primary w-[12em]'
      >
        count is {count}
      </button>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente eos labore animi unde. Sit laudantium rem ducimus nisi labore!</p>
    </div>
  )
}

export default App
