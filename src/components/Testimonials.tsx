import { ImQuotesLeft, ImQuotesRight } from "react-icons/im"
import { testimonials1, testimonials2, testimonials3 } from "../images"
import { Stars } from "../components"
import { useEffect, useState } from "react"

const testimonials = [
    {
        picture: testimonials1,
        name: "David Lee",
        text: "I've been a loyal customer for years, and I keep coming back because of the fantastic selection and unbeatable prices. The staff is always friendly and helpful. I can't imagine shopping anywhere else!",
        rating: 4.5,
    },
    {
        picture: testimonials2,
        name: "Sarah Johnson",
        text: "I absolutely love shopping at this store! The quality of the clothes is amazing, and the customer service is top-notch. I always find trendy pieces that fit perfectly. Highly recommended!",
        rating: 5,
    },
    {
        picture: testimonials3,
        name: "Emily Thompson",
        text: "Shopping here is such a delight! The store has a wonderful atmosphere, and the clothes are stylish and affordable. Plus, the online ordering process is smooth and efficient. I'm a satisfied customer!",
        rating: 4,
    },
]

const Testimonials = () => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const len = testimonials.length - 1
        index > len && setIndex(0)
        index < 0 && setIndex(len)
    }, [index])
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => prev + 1)
        }, 5000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className="py-12 px-8 md:px-16 lg:px-32 flex flex-col gap-16 justify-center items-center">
            <h2 className="text-3xl md:text-5xl font-semibold mx-auto text-neutral-800">
                Testimonials
            </h2>
            <div className="relative h-[410px] w-full flex justify-center items-center overflow-x-hidden">
                {testimonials.map((testimonial, idx) => {
                    const { name, picture, rating, text } = testimonial
                    let translate
                    let isNext = false

                    if (idx === index) {
                        translate = 0
                    } else if (
                        idx === index + 1 ||
                        (index === testimonials.length - 1 && idx === 0)
                    ) {
                        translate = 200
                        isNext = true
                    } else {
                        translate = -200
                        // 110
                    }
                    return (
                        <div
                            key={idx}
                            className={`absolute transition-transform ${
                                isNext ? "duration-0" : "duration-500"
                            }`}
                            style={{
                                transform: `translateX(${translate}%)`,
                            }}
                        >
                            <div className="bg-gray-100 rounded-xl max-w-lg flex flex-col gap-6 relative px-8 pb-8 pt-20 shadow-lg shadow-neutral-300">
                                <img
                                    src={picture}
                                    alt={name}
                                    className="absolute rounded-full max-w-32 left-1/2 -translate-x-1/2 -top-14 border-[4px] border-white max-sm:max-w-24"
                                />
                                <div className="absolute -top-5 left-5 bg-neutral-600 p-2.5 rounded-full max-sm:hidden">
                                    <ImQuotesLeft className="size-6 text-white" />
                                </div>
                                <div className="absolute -bottom-5 right-5 bg-neutral-600 p-2.5 rounded-full max-sm:hidden">
                                    <ImQuotesRight className="size-6 text-white" />
                                </div>
                                <p className="text-center max-sm:text-xs">
                                    {text}
                                </p>
                                <div className="flex justify-between flex-wrap gap-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-700">
                                        {name}
                                    </h3>
                                    <Stars rating={rating} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonials
