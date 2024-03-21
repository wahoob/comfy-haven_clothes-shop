import { Link } from "react-router-dom"
import useSlider from "../useSlider"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useEffect } from "react"
import { FeaturedStyles, CustomStyles, ImageWithEffect } from "../components"

const Home = () => {
    const {
        currentImgIndex,
        next,
        back,
        goTo,
        sliderLength,
        images,
        isTextLeft,
    } = useSlider()
    useEffect(() => {
        const timer = setInterval(() => {
            next()
        }, 15000)
        return () => clearInterval(timer)
    }, [next])
    return (
        <>
            <main className="h-[calc(100vh-8rem)] relative overflow-hidden">
                <BsChevronLeft
                    className="size-12 text-neutral-200 absolute top-1/2 left-4 -translate-y-1/2 opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
                    onClick={() => back()}
                />
                <BsChevronRight
                    className="size-12 text-neutral-200 absolute top-1/2 right-4 -translate-y-1/2 opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
                    onClick={() => next()}
                />
                <div className="flex items-center gap-4 absolute bottom-12 md:bottom-12 left-10">
                    {[...Array(sliderLength).keys()].map((i) => (
                        <div
                            key={i}
                            className={`size-3 rounded-full transition-colors cursor-pointer ${
                                currentImgIndex === i
                                    ? "bg-neutral-800"
                                    : "bg-white"
                            }`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
                {images}
                <div
                    className={`flex items-end md:items-center h-full ${
                        isTextLeft ? "justify-start" : "justify-end"
                    }`}
                >
                    <div className="basis-full sm:basis-1/2 flex flex-col gap-4 items-start justify-center pb-24 px-4 md:px-[13vw] font-custom">
                        <p className="text-xs text-white font-medium uppercase tracking-wide">
                            Finest garments available in our boutique.
                        </p>
                        <h1 className="text-5xl text-white font-semibold">
                            Comfy Haven
                        </h1>
                        <Link
                            to="/products"
                            className="bg-white px-6 py-1 text-base font-medium hover:text-cyan-900 mt-4"
                        >
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </main>
            <FeaturedStyles />
            <CustomStyles />
            <ImageWithEffect />
        </>
    )
}

export default Home
