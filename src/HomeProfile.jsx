import { FaSearch, FaTasks, FaUser } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { MdOutlineDashboard, MdSettings, MdLogout } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'
import { AuthContext } from './AuthContext'
import { useContext } from 'react'


export default function HomeProfile(){
    const { authState, setIsAuthenticated, setTokens } = useContext(AuthContext)
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen bg-amber-100">
            <aside className=" grid grid-rows-10 bg-gradient-to-tr from-blue-700 to-blue-900 text-white rounded-r-xl place-items-stretch gap-[5px] shadow-sm ">
                <div className='rounded-full w-6 h-6 '>
                    <PiStudentFill />
                    {authState?.currentUser?.username}
                </div>
                
                <div className='m-1'></div>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <MdOutlineDashboard />
                    Dashboard
                </button>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <FaTasks />
                    Tasks
                </button>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <FaSearch />
                    Find Courses
                </button>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <GiProgression />
                    Statistics
                </button>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <LuCalendarDays />
                    Calendar
                </button>
                <div className='m-1'></div>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100'>
                    <MdSettings />
                    Settings
                </button>
                <button className='bg-blue-800 hover:bg-blue-950 m-2 inline-flex items-baseline w-[200px] h-[50px] hover:cursor-pointer transition-colors duration-100' onClick={() => {
                    setIsAuthenticated(false);
                    setTokens({
                        accessToken: null,
                    })}}>
                    <MdLogout />
                    Logout
                </button>
            </aside>

            <main className="grid grid-cols-[200px_100px] ">
                
            </main>
        </div>
    )
}