import { FaSearch, FaTasks } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { MdOutlineDashboard, MdSettings, MdLogout } from 'react-icons/md'
import { LuCalendarDays } from 'react-icons/lu'
import { AuthContext } from './AuthContext'
import { useContext } from 'react'

function StretchOutIcon({ icon: Icon }){
    return (
        <div className='...'>
            <Icon />
        </div>
    )
}

export default function HomeProfile(){
    const { authState, setIsAuthenticated, setTokens } = useContext(AuthContext)
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen bg-amber-50">
            <aside className=" grid grid-rows-10 bg-gradient-to-tr from-blue-700 to-blue-900 text-white rounded-r-xl w-[50px] place-items-center gap-[5px] ">
                <div className='hover:brightness-50 m-1'><MdOutlineDashboard /></div>
                <div className='hover:brightness-50 m-1'><FaTasks /></div>
                <div className='hover:brightness-50 m-1'><FaSearch /></div>
                <div className='hover:brightness-50 m-1'><GiProgression /></div>
                <div className='hover:brightness-50 m-1'><LuCalendarDays /></div>
                <div className='m-1'></div>
                <div className='m-1'></div>
                <div className='m-1'></div>
                <div className='hover:brightness-50 m-1'><MdSettings /></div>
                <div className='hover:brightness-50 m-1'><MdLogout onClick={() => {
                    setIsAuthenticated(false);
                    setTokens({
                        accessToken: null,
                    })
                }}/></div>
            </aside>

            <main className="grid grid-cols-[200px_100px]">
                
            </main>
        </div>
    )
}