import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="bg-neutral-900 flex h-12 px-6 items-center">
            <Link
                to="/products"
                className="hidden md:flex items-center gap-3 text-white text-xs bg-cyan-800 transition-colors hover:bg-cyan-900 px-4 py-1 rounded-full"
            >
                <p>20%</p>
                <p className="underline font-medium uppercase text-[0.65rem]">
                    Off Your 1st Purchase
                </p>
            </Link>
            <p className="text-white text-[0.65rem] font-semibold uppercase tracking-wider absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                Craft Your Style:{" "}
                <Link
                    to="/products"
                    className="underline transition-colors hover:text-cyan-700"
                >
                    Starting Here.
                </Link>
            </p>
        </div>
    )
}

export default Header
