import { useRef } from "react"
import { animationImage } from "../images"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const ImageWithEffect = () => {
    const text1 = useRef<HTMLHeadingElement>(null)
    const text2 = useRef<HTMLHeadingElement>(null)
    const text3 = useRef<HTMLHeadingElement>(null)
    const text4 = useRef<HTMLHeadingElement>(null)
    const text5 = useRef<HTMLHeadingElement>(null)
    const tl1 = useRef<gsap.core.Timeline | null>(null)
    const tl2 = useRef<gsap.core.Timeline | null>(null)
    const tl3 = useRef<gsap.core.Timeline | null>(null)
    const tl4 = useRef<gsap.core.Timeline | null>(null)
    const tl5 = useRef<gsap.core.Timeline | null>(null)
    useGSAP(() => {
        const play = () => {
            //
            tl1.current = gsap
                .timeline()
                .to(text1.current, {
                    opacity: 0,
                    repeat: 3,
                    duration: 0.05,
                    repeatDelay: 0.15,
                })
                .to(text1.current, {
                    opacity: 1,
                    duration: 0.05,
                })
                .to(text1.current, {
                    opacity: 0,
                    repeat: 2,
                    duration: 0.05,
                    repeatDelay: 0.15,
                    delay: 0.4,
                })
            //
            tl2.current = gsap
                .timeline({ delay: 0.65 })
                .set(text2.current, {
                    opacity: 1,
                })
                .to(text2.current, {
                    opacity: 0,
                    repeat: 3,
                    duration: 0.05,
                    repeatDelay: 0.15,
                })
                .to(text2.current, {
                    opacity: 1,
                    duration: 0.05,
                })
                .to(text2.current, {
                    opacity: 0,
                    repeat: 2,
                    duration: 0.05,
                    repeatDelay: 0.15,
                    delay: 0.4,
                })
            //
            tl3.current = gsap
                .timeline({ delay: 1.3 })
                .set(text3.current, {
                    opacity: 1,
                })
                .to(text3.current, {
                    opacity: 0,
                    repeat: 3,
                    duration: 0.05,
                    repeatDelay: 0.15,
                })
                .to(text3.current, {
                    opacity: 1,
                    duration: 0.05,
                })
                .to(text3.current, {
                    opacity: 0,
                    repeat: 2,
                    duration: 0.05,
                    repeatDelay: 0.15,
                    delay: 0.4,
                })
            //
            tl4.current = gsap
                .timeline({ delay: 1.8 })
                .set(text4.current, {
                    opacity: 1,
                })
                .to(text4.current, {
                    opacity: 0,
                    repeat: 3,
                    duration: 0.05,
                    repeatDelay: 0.15,
                })
                .to(text4.current, {
                    opacity: 1,
                    duration: 0.05,
                })
                .to(text4.current, {
                    opacity: 0,
                    repeat: 2,
                    duration: 0.05,
                    repeatDelay: 0.15,
                    delay: 0.4,
                })
            //
            tl5.current = gsap
                .timeline({ delay: 3.5, onComplete: play })
                .set(text5.current, {
                    opacity: 1,
                })
                .to(text5.current, {
                    opacity: 0,
                    repeat: 10,
                    duration: 0.05,
                    repeatDelay: 0.2,
                })
                .set(text5.current, {
                    opacity: 1,
                })
                .to(text5.current, {
                    opacity: 0,
                    repeat: 2,
                    duration: 0.05,
                    repeatDelay: 0.15,
                    delay: 3,
                })
                .set(text5.current, {
                    opacity: 0,
                    delay: 3,
                })
        }
        play()
    })

    return (
        <div className="px-4 lg:px-8 relative text-white font-custom pointer-events-none overflow-hidden">
            <img src={animationImage} alt="fashion" className="w-full h-auto" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-[13vw] uppercase whitespace-nowrap leading-[100%]">
                <h1 ref={text1}>Comfy Haven</h1>
                <h1 ref={text2} className="opacity-0">
                    Comfy Haven
                </h1>
                <h1 ref={text3} className="opacity-0">
                    Comfy Haven
                </h1>
                <h1 ref={text4} className="opacity-0">
                    Comfy Haven
                </h1>
            </div>
            <h1
                ref={text5}
                className="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw] uppercase whitespace-nowrap"
            >
                Comfy Haven
            </h1>
        </div>
    )
}

export default ImageWithEffect
