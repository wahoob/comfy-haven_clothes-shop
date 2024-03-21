import { GiHanger } from "react-icons/gi"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"
import useGlobalContext from "../useGlobalContext"
import { useEffect, useState } from "react"

const Navbar = () => {
    const { qty, openSidebar } = useGlobalContext()
    const { pathname } = useLocation()
    const [isShopingCartVisible, setIsShopingCartVisible] = useState(true)
    useEffect(() => {
        setIsShopingCartVisible(pathname === "/cart")
    }, [pathname])

    return (
        <nav className="flex justify-between items-center py-3 px-8 md:px-16 lg:px-32 sticky w-full h-16 top-0 left-0 bg-white z-10">
            <Link to="/">
                <GiHanger className="size-8 md:size-10 cursor-pointer text-neutral-700 hover:text-neutral-900" />
            </Link>
            <div className="flex gap-2 md:gap-4 items-center uppercase font-semibold text-neutral-700 max-md:text-xs">
                <Link
                    to="/"
                    className="transition-colors hover:text-neutral-950 relative group"
                >
                    Home
                    <div className="w-0 group-hover:w-[120%] h-1 bg-cyan-900 rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-2.5 transition-all" />
                </Link>
                <Link
                    to="/about"
                    className="transition-colors hover:text-neutral-950 relative group"
                >
                    About
                    <div className="w-0 group-hover:w-[120%] h-1 bg-cyan-900 rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-2.5 transition-all" />
                </Link>
                <Link
                    to="/products"
                    className="transition-colors hover:text-neutral-950 relative group"
                >
                    Products
                    <div className="w-0 group-hover:w-[120%] h-1 bg-cyan-900 rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-2.5 transition-all" />
                </Link>
            </div>
            <div className={`relative ${isShopingCartVisible && "opacity-0"}`}>
                <div onClick={() => openSidebar()}>
                    <HiOutlineShoppingBag className="size-8 md:size-10 cursor-pointer text-neutral-700 hover:text-neutral-900" />
                </div>
                <div className="absolute -right-1.5 top-0 flex items-center justify-center size-6 bg-cyan-900 rounded-full text-white text-sm pointer-events-none">
                    {qty}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
