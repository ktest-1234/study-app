import { FaSearch, FaTasks } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { MdOutlineDashboard, MdSettings, MdLogout, MdDragIndicator } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'

import { useContext, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { handleDeleteRequest } from './fetch_api'
import { motion as m, useDragControls } from 'framer-motion'
import { div } from 'framer-motion/client'


function NavigationButton({ icon: Icon, name }){
    return (
        <button className='col-start-1 bg-blue-700 hover:bg-blue-950 inline-flex items-baseline h-[50px] hover:cursor-pointer transition-colors duration-100 gap-1'>
            <Icon className='w-3 h-3 ml-2' />
            {name}
        </button>
    )
}

function LogoutButton(){
    const { authState, setIsAuthenticated, setTokens, setCurrentUser } = useContext(AuthContext);
    async function Logout(){
        setIsAuthenticated(false);
        const response = await handleDeleteRequest({}, 'api/auth/users/logout/');
    }
    return(
        <button className='col-start-1 bg-blue-700 hover:bg-blue-950 inline-flex items-baseline h-[50px] hover:cursor-pointer transition-colors duration-100 gap-1 ' onClick={() => {
            Logout();
        }}>
            <MdLogout className='w-3 h-3 ml-2' />
            Logout
        </button>
    )
}

function ProfileSection({ username, picture }){
    return (
        <div className='col-start-1 rounded-full w-6 h-6 m-3'>
            {picture ? picture : <PiStudentFill className='w-5 h-5' />}
            <br />
            {username}
        </div>
    );
}

function HeroSection({ onDrag, dragRef }){
    const dragControls = useDragControls()
    return (
        <m.aside
            className="col-start-1 row-start-1 w-[250px] z-20 grid grid-rows-11 grid-cols-[230px_20px] bg-blue-700 text-white drop-shadow-lg font-light rounded-md font-mono touch-none"
            drag='x'
            dragConstraints={{left:-230, right:0}}
            dragElastic={0}
            dragMomentum={false}
            dragControls={dragControls}
            dragListener={false}
            onDrag={onDrag}
        >   
            <ProfileSection username={JSON.parse(localStorage.getItem('currentUser'))?.username} picture={null} />
            
            <div className='col-start-1'></div>

            <NavigationButton icon={MdOutlineDashboard} name='Dashboard'/>
            <NavigationButton icon={FaTasks} name='Tasks'/>
            <NavigationButton icon={FaSearch} name='Find Courses' />
            <NavigationButton icon={GiProgression} name='Statistics' />
            <NavigationButton icon={LuCalendarDays} name='Calendar' />

            <div className='col-start-1'></div>

            <NavigationButton icon={MdSettings} name='Settings' />
            <LogoutButton />

            <MdDragIndicator
                className='col-start-2 row-span-full flex justify-center items-center h-screen touch-none bg-blue-700'
                onPointerDown={(e) => dragControls.start(e)}
            />
        </m.aside>
    );
}

function MainWindow(){
    return (
        <main className="grid grid-rows-3 grid-cols-3">
            <div className="col-span-full row-span-1 drop-shadow-xl rounded-md bg-slate-100 m-3 flex items-center justify-center">
                <p className='font-bold font-mono text-black'>
                    Welcome Back, User!
                    <br /> Let's continue where you have left off!
                </p>
            </div>
            <h2>Recommended Courses</h2>
            <h2>Current Courses</h2>
        </main>
    );
}

export default function HomeProfile(){
    const [heroOnScreen, setHeroOnScreen] = useState(250)
    return(
        <div className='grid'>
            <HeroSection onDrag={(event, info) => {
                if (info.point.x <= 20){
                    setHeroOnScreen(20 + 5);
                } else if (info.point.x >= 250){
                    setHeroOnScreen(250);
                } else {
                    setHeroOnScreen(info.point.x + 5);
                }
            }} />
            <div style={{"--hero":`${heroOnScreen}px`}} className={"col-start-1 row-start-1 z-0 grid grid-cols-[var(--hero)_1fr] min-h-screen bg-white w-screen"}>
                <div className='h-screen'></div>
                <MainWindow />
            </div>
        </div>
    )
}