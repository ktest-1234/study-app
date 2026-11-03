import { FaBars, FaSearch } from 'react-icons/fa'
import { useState } from 'react'

function MoreInfoDropdown({ isHamburgerHovered }) {
    return (
        <>
            <div className="flex flex-row justify-center items-cemter h-[25vm] py-5 [&>*]:ml-5 bg-blue-200 rounded-md">
                <p>Profile</p>
                <p>Settings</p>
                <p>Logout</p>
            </div>
        </>
    );
}
function NavigationPanel({children}) {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
    const [isHamburgerHovered, setIsHamburgerHovered] = useState(false)
    function handleClick(e){
        e.preventDefault()
        if (isHamburgerClicked){
            console.log('yay')
        }
        setIsHamburgerClicked(!isHamburgerClicked)
    }
    function handleMouseEnter(){
        setIsHamburgerHovered(true)
    }
    function handleMouseLeave(){
        setIsHamburgerHovered(false)
    }
    return (
        <>
            <nav className="flex flex-row justify-center items-cemter h-[25vm] py-5 [&>*]:ml-5 bg-blue-100 rounded-md">
                <h1 className="font-bold">Study App</h1>
                {children}
                <button type="button" onMouseEnter={() => setIsHamburgerHovered(true)} onMouseLeave={() => setIsHamburgerHovered(false)} onClick={handleClick}>
                    {isHamburgerHovered ? <FaSearch /> :  <FaBars />}
                </button>
            </nav>
            {isHamburgerHovered  && (
                <MoreInfoDropdown isHamburgerHovered={isHamburgerHovered} />
            )}
        </>
    );
}
export default function HomeProfile() {
    return(
        <NavigationPanel>
            <h2>Hello</h2>
            <h2>Hello</h2>
            <h2>Hello</h2>
        </NavigationPanel>
    )
}