type CustomeImageProps = {
    desktopBg: string
    mobileBg: string
    isVisible: boolean
}

const CustomImage = ({ desktopBg, mobileBg, isVisible }: CustomeImageProps) => {
    return (
        <div>
            <img
                src={desktopBg}
                alt="home background"
                className={`max-md:hidden absolute -z-10 left-1/2 -top-4 -translate-x-1/2 min-w-[1520px] w-full transition-opacity duration-[1500ms] ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            />
            <img
                src={mobileBg}
                alt="home background"
                className={`md:hidden absolute -z-10 max-w-[800px] min-w-[400px] w-full top-[50%] -translate-y-1/2 transition-opacity duration-[1500ms] ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    )
}

export default CustomImage
