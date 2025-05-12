import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo"/></a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react"/></a>
            </div>
            <h1>Welcome to Web Dev</h1>

            <div className="card">gi
                <button onClick={() => setCount((count) => count + 1)}>git
                    count is {count}</button>
                <p>Edit <code>src/App.tsx</code>
                    and save to test HMR</p>
            </div>
        </>
    )
}

export default App