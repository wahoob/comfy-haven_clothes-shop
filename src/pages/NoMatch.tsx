import { Link, useNavigate } from "react-router-dom"
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"
import { SiFrontendmentor } from "react-icons/si"
import { cloud, manfloat, waterfront, waterback } from "../images"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

const NoMatch = () => {
    const navigate = useNavigate()

    const manRef = useRef<HTMLImageElement | null>(null)
    const cloudRef = useRef<HTMLImageElement | null>(null)
    const frontWater = useRef<HTMLImageElement | null>(null)
    const backWater = useRef<HTMLImageElement | null>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)
    useGSAP(() => {
        tl.current = gsap
            .timeline({ yoyo: true, repeat: -1, repeatDelay: 1 })
            .to(cloudRef.current, {
                x: 30,
                duration: 5,
                ease: "sine.out",
            })
            .to(
                manRef.current,
                {
                    rotate: 2,
                    translateX: "-53%",
                    duration: 5,
                    ease: "sine.out",
                },
                "<"
            )
            .to(
                frontWater.current,
                {
                    rotate: -0.5,
                    duration: 5,
                    ease: "sine.out",
                },
                "<"
            )
            .to(
                backWater.current,
                {
                    rotate: 0.5,
                    duration: 5,
                    ease: "sine.out",
                },
                "<"
            )
    })
    return (
        <div className="bg-neutral-950 h-[calc(100vh-110px)] overflow-hidden relative">
            <div className="absolute z-40 left-0 top-1/2 -translate-y-1/2 flex flex-col justify-between text-white h-full pt-4">
                <h1 className="pointer-events-none text-3xl font-medium px-8">
                    Comfy Haven
                </h1>
                <div className="hidden sm:flex flex-col gap-2 px-8">
                    <SiFrontendmentor className="size-5 cursor-pointer transition-colors hover:text-cyan-800" />
                    <FaGithub className="size-5 cursor-pointer transition-colors hover:text-cyan-800" />
                    <FaLinkedin className="size-5 cursor-pointer transition-colors hover:text-cyan-800" />
                    <FaTwitter className="size-5 cursor-pointer transition-colors hover:text-cyan-800" />
                </div>
                <button
                    className="w-fit transition-colors hover:bg-cyan-800 text-2xl px-8 py-8"
                    onClick={() => navigate(-1)}
                >
                    PREV
                </button>
            </div>
            <div className="absolute z-30 top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-14 pointer-events-none">
                <p className="text-gray-300 text-xs">ERROR 404</p>
                <div className="text-white uppercase text-[6vw] max-sm:text-5xl font-semibold tracking-tighter">
                    <p>hmm...</p>
                    <p>you're lost</p>
                </div>
                <Link
                    to="/"
                    className="border-b-2 p-1 border-cyan-800 text-gray-300 max-md:text-white transition-all hover:text-cyan-800 hover:border-b-[4px] font-medium w-fit cursor-pointer max-sm:text-xs pointer-events-auto"
                >
                    TAKE ME HOME
                </Link>
                <p className="text-gray-300 max-md:text-white uppercase text-xs sm:text-sm">
                    the page you are looking for is missing
                </p>
            </div>
            <div className="absolute w-full md:w-[58%] h-[90%] right-0 bottom-0 custom-linear overflow-hidden pointer-events-none">
                <img
                    src={cloud}
                    alt="cloud"
                    className="absolute lg:-top-[40%] -top-[20%] -right-0 -translate-x-7"
                    ref={cloudRef}
                />
                <img
                    src={waterback}
                    alt="water back"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[110%] -rotate-2"
                    ref={backWater}
                />
                <img
                    src={manfloat}
                    alt="man float"
                    className="absolute bottom-0 max-w-72 lg:max-w-96 left-1/2 -translate-x-[47%] -rotate-2"
                    ref={manRef}
                />
                <img
                    src={waterfront}
                    alt="water front"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 min-w-[110%] rotate-2"
                    ref={frontWater}
                />
            </div>
        </div>
    )
}

export default NoMatch
