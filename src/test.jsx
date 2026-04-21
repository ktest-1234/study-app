import { motion as m } from 'framer-motion'
export default function Test() {
    return(
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full h-screen bg-blue-900 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Hello World</h1>
            </div>
        </m.div>

        
    )
    
}