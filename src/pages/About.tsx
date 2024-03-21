import { Link } from "react-router-dom"
import { IoPersonSharp } from "react-icons/io5"
import useGlobalContext from "../useGlobalContext"
import { Testimonials } from "../components"
import { aboutImage, aboutMan, aboutWoman } from "../images"

const founders = [
    "Evelyn Stone",
    "Marcus Rivera",
    "Gavin Mitchell",
    "Nora Chen",
]

const About = () => {
    const { filterProducts } = useGlobalContext()
    return (
        <div>
            <div className="relative mb-8 overflow-x-hidden">
                <img
                    src={aboutImage}
                    alt="about"
                    className="w-full min-w-[700px]"
                />
                <h1 className="absolute bottom-10 left-8 text-3xl md:text-5xl text-white">
                    Comfy Haven
                </h1>
            </div>
            <div className="flex max-sm:flex-col gap-8 px-8 md:px-16 lg:px-32 py-8">
                <div className="relative basis-1/2 flex justify-center">
                    <img
                        src={aboutWoman}
                        alt="woman"
                        className="w-full max-w-md"
                    />
                    <Link
                        to="/products"
                        className="absolute uppercase bg-white hover:bg-gray-100 transition-colors text-cyan-950 font-medium px-6 py-2 rounded-xl left-1/2 bottom-6 -translate-x-1/2 whitespace-nowrap"
                        onClick={() => filterProducts("women's clothing")}
                    >
                        Buy Now
                    </Link>
                </div>
                <div className="relative basis-1/2 flex justify-center">
                    <img src={aboutMan} alt="man" className="w-full max-w-md" />
                    <Link
                        to="/products"
                        className="absolute uppercase bg-white hover:bg-gray-100 transition-colors text-cyan-950 font-medium px-6 py-2 rounded-xl left-1/2 bottom-6 -translate-x-1/2 whitespace-nowrap"
                        onClick={() => filterProducts("men's clothing")}
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
            <div className="px-8 md:px-16 lg:px-32 py-12 flex flex-col gap-16">
                <h2 className="text-3xl md:text-5xl font-semibold mx-auto text-neutral-800">
                    Founders
                </h2>
                <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] xl:grid-cols-4">
                    {founders.map((founder, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-4 items-center"
                            >
                                <IoPersonSharp className="max-w-64 w-64 h-auto text-cyan-900" />
                                <h3 className="text-neutral-800 text-xl font-medium">
                                    {founder}
                                </h3>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Testimonials />
        </div>
    )
}

export default About
