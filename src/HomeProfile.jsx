import { FaSearch, FaTasks } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { MdOutlineDashboard, MdSettings, MdLogout } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'

function NavigationButton({ icon: Icon, name }){
    return (
        <button className='bg-blue-700 hover:bg-blue-950 inline-flex items-baseline h-[50px] hover:cursor-pointer transition-colors duration-100 gap-1'>
            <Icon className='w-3 h-3 ml-2' />
            {name}
        </button>
    )
}

function LogoutButton(){
    return(
        <button className='bg-blue-700 hover:bg-blue-950 inline-flex items-baseline h-[50px] hover:cursor-pointer transition-colors duration-100 gap-1 ' onClick={() => {
            setIsAuthenticated(false);
            setTokens({
                accessToken: null,
            })}}>
            <MdLogout className='w-3 h-3 ml-2' />
            Logout
        </button>
    )
}

function ProfileSection({ username, picture }){
    return (
        <div className='rounded-full w-6 h-6 m-3'>
            {picture ? picture : <PiStudentFill className='w-5 h-5' />}
            <br />
            {username ? username : "Profile"}
        </div>
    );
}

function NavigationSection(){
    return (
        <aside className=" grid grid-rows-10 bg-blue-700 text-white drop-shadow-lg font-light ">
            <ProfileSection username={localStorage.getItem('currentUser')?.username} picture={null} />
            
            
            <div className='...'></div>

            <NavigationButton icon={MdOutlineDashboard} name='Dashboard' />
            <NavigationButton icon={FaTasks} name='Tasks' />
            <NavigationButton icon={FaSearch} name='Find Courses' />
            <NavigationButton icon={GiProgression} name='Statistics' />
            <NavigationButton icon={LuCalendarDays} name='Calendar' />

            <div className='...'></div>

            <NavigationButton icon={MdSettings} name='Settings' />
            <LogoutButton />
            
            
        </aside>
    );
}

export default function HomeProfile(){
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen bg-white">
            <NavigationSection />

            <main className="grid grid-flow-row-dense grid-cols-3 grid-row-3">
                <div className="col-span-full row-span-2 drop-shadow-xl rounded-md bg-slate-100 m-3 place-items-center">
                    <h1 className='font-thin text-black'>Welcome Back, User!</h1>
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
            </main>
        </div>
    )
}