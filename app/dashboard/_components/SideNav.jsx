'use client'
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import {
  ChartBarIcon,
  ChartPieIcon,
  DocumentCheckIcon,
  Square2StackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"


const containerVariants = {
  close: {
    width: "5rem",
    fontSize:"1rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
}

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const path=usePathname();
  useEffect(()=>{
      console.log(path)
  },[])

  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      svgControls.start("open")
    } else {
      containerControls.start("close")
      svgControls.start("close")
    }
  }, [isOpen])

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
    
  }

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-secondary flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          
          <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
          <button
            className="p-1 rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-800"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 stroke-neutral-800">
            <motion.path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
            variants={svgVariants}
            animate={svgControls}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />

            </svg>

          </button>
        </div>
        <div className="flex flex-col gap-3">
            <div className='p-4 items-center justify-between bg-secondary shadow-sm'>
             
                <ul className='hidden md:block  gap-6'>
                <Link href={"/"}>
                    <motion.li className={`hover:text-primary  hover:font-bold transition-all
                    cursor-pointer
                    ${path=='/'&&'text-primary font-bold'}
                    `}
                    animate={svgControls}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    >Home</motion.li>
                    </Link>
                <Link href={"/dashboard"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                    cursor-pointer
                    ${path=='/dashboard'&&'text-primary font-bold'}
                    `}
                    
                    >Dashboard</li>
                    </Link>
                    
                    <li className={`hover:text-primary hover:font-bold transition-all
                    cursor-pointer
                    ${path=='/dashboard/questions'&&'text-primary font-bold'}
                    `}>Questions</li>
                    <Link href={"/dashboard/upgrade"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                    cursor-pointer
                    ${path=='/dashboard/upgrade'&&'text-primary font-bold'}
                    `}>Upgrade</li>
                    </Link>
                    <li className={`hover:text-primary hover:font-bold transition-all
                    cursor-pointer
                    ${path=='/dashboard/how'&&'text-primary font-bold'}
                    `}>How it Works?</li>
                </ul>
                <UserButton/>
            </div>
        </div>
        <div className="flex flex-col gap-3">
          
        </div>
      </motion.nav>
      <AnimatePresence>
        
      </AnimatePresence>
    </>
  )
}

export default SideNav