import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { IoIosStar } from "react-icons/io"

type StarsProps = {
    rating: number
}

const Stars = ({ rating }: StarsProps) => {
    const fillYellow = Math.floor(rating)
    const fillPercentage = (rating - fillYellow) * 100
    const container = useRef<HTMLDivElement>(null)
    const tween = useRef<gsap.core.Tween>()
    const { contextSafe } = useGSAP({ scope: container })

    const onMouseHover = contextSafe(() => {
        if (tween.current?.isActive()) return
        tween.current = gsap.to(".star", {
            scale: 1.3,
            duration: 0.3,
            repeat: 1,
            yoyo: true,
            ease: "power3.out",
            stagger: {
                each: 0.1,
            },
        })
        tween.current.play()
    })
    return (
        <div
            className="flex items-center relative group gap-0.5"
            ref={container}
            onMouseEnter={onMouseHover}
        >
            <div className="absolute bg-[rgba(0,0,0,0.65)] text-white -top-7 -right-4 px-2 py-0.5 text-xs rounded-sm z-10 hidden group-hover:block">
                {rating}
            </div>
            {[...Array(5).keys()].map((index) => {
                if (index < fillYellow) {
                    return (
                        <IoIosStar
                            key={index}
                            className="text-yellow-600 star"
                        />
                    )
                }
                if (index === fillYellow) {
                    return (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            width="13px"
                            height="13px"
                            viewBox="0 0 32 32"
                            className="star"
                        >
                            <defs>
                                <linearGradient id={`grad${index}`}>
                                    <stop
                                        offset={`${fillPercentage}%`}
                                        stopColor="#CA8A04"
                                    />
                                    <stop
                                        offset={`${fillPercentage}%`}
                                        stopColor="#404040"
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                fill={`url(#grad${index})`}
                                d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118l11.547-1.2L16.026,0.6L20.388,10.918z"
                            />
                        </svg>
                    )
                }
                return (
                    <IoIosStar
                        key={index}
                        className="text-neutral-700 star"
                    ></IoIosStar>
                )
            })}
        </div>
    )
}

export default Stars
