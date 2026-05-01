import { motion as m } from 'framer-motion'

function Pop({ initial, animate, duration, visualDuration, bounce, children }){
    return (
        <m.div
            initial={initial}
            animate={animate}
            transition={{
                duration: duration,
                scale: { type: "spring", visualDuration: visualDuration, bounce: bounce },
            }}
        >
            {children}
        </m.div>
    )
}

export default Pop;