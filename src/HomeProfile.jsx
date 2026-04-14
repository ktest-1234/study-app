import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

function Dashboard({children}) {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
    function handleClick(e){
        e.preventDefault()
        if (isHamburgerClicked){
            console.log('yay')
        }
        setIsHamburgerClicked(!isHamburgerClicked)
    }
    return (
        <nav className="flex flex-row justify-center items-cemter h-[25vm] py-5 [&>*]:ml-5 bg-blue-100 rounded-md">
            <h1 className="font-bold">Study App</h1>
            {children}
            <button type="button" onClick={handleClick}><FaBars /></button>
        </nav>
    );
}
export default function HomeProfile() {
    return(
        <Dashboard>
            <h2>Hello</h2>
            <h2>Hello</h2>
            <h2>Hello</h2>
        </Dashboard>
    )
}