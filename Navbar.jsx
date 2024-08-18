import React from 'react'
import "./Navbar.css"
const Navbar = () => {
    return (
        <nav className='bg-violet-700 text-white flex w-500 justify-between w-screen'>
            <div className="logo mx-9 text-3xl cursor-pointer ">
                iTask
            </div>
            <ul className="content flex gap-10 mx-9 text-1xl justify-center items-center ">
                <li className='cursor-pointer hover:font-bold'>Home</li>
                <li className='cursor-pointer hover:font-bold'>About</li>
                <li className='cursor-pointer hover:font-bold'>Contact</li>
            </ul>

        </nav>
    )
}

export default Navbar
