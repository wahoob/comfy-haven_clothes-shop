import { GiLaserPrecision } from "react-icons/gi"
import { MdDashboardCustomize } from "react-icons/md"
import { FaFileSignature } from "react-icons/fa"

const styles = [
    {
        Icon: GiLaserPrecision,
        title: "Tailored",
        text: "Tailored craftsmanship reflecting your individuality. Our artisans blend modernity and minimalism or intricate detailing.",
    },
    {
        Icon: MdDashboardCustomize,
        title: "Personalized",
        text: "Enter a realm where craftsmanship meets your desires. Our artisans handcraft each piece to fit your preferences flawlessly.",
    },
    {
        Icon: FaFileSignature,
        title: "Uniquely Yours",
        text: "Embrace designs that bear the mark of your individuality. Our artisans sculpt each piece to echo your essence uniquely.",
    },
]
const CustomStyles = () => {
    return (
        <div className="py-12 px-8 md:px-16 lg:px-32 bg-gray-100 flex flex-col gap-12 xl:gap-0 shadow mb-24">
            <div className="flex justify-between gap-8 max-sm:flex-col max-sm:text-center">
                <h1 className="basis-1/4 text-3xl font-semibold text-cyan-950">
                    Crafted Exclusively for Your Style
                </h1>
                <p className="basis-1/2 text-cyan-950">
                    Experience bespoke luxury tailored to your unique style.
                    Elevate your wardrobe with precision-crafted apparel that
                    exudes elegance and flair, reflecting your individuality
                    with every stitch.
                </p>
            </div>
            <div className="grid gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] xl:relative xl:top-24">
                {styles.map((style, index) => {
                    const { Icon, title, text } = style
                    return (
                        <div
                            key={index}
                            className="p-8 flex flex-col gap-6 bg-cyan-700 rounded-lg shadow-lg shadow-gray-400"
                        >
                            <div className="size-16 rounded-full bg-gray-300 flex justify-center items-center mx-auto">
                                <Icon className="size-7" />
                            </div>
                            <h3 className="text-xl text-gray-200 text-center font-semibold">
                                {title}
                            </h3>
                            <p className="text-gray-200 text-center">{text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CustomStyles
