import {
    desktopBg1,
    mobileBg1,
    desktopBg2,
    mobileBg2,
    desktopBg3,
    mobileBg3,
} from "./images"
import { useEffect, useState } from "react"
import CustomImage from "./components/CustomImage"

const slider = [
    { desktop: desktopBg1, mobile: mobileBg1, isLeft: false },
    { desktop: desktopBg2, mobile: mobileBg2, isLeft: true },
    { desktop: desktopBg3, mobile: mobileBg3, isLeft: false },
]

const useSlider = () => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const [isChanging, setIsChanging] = useState(false)

    useEffect(() => {
        setIsChanging(true)
        const timer = setInterval(() => {
            setIsChanging(false)
        }, 2000)
        return () => clearInterval(timer)
    }, [currentImgIndex])

    function next() {
        if (isChanging) return
        setCurrentImgIndex((prev) => {
            const temp = prev + 1
            return temp > slider.length - 1 ? 0 : temp
        })
    }
    function back() {
        if (isChanging) return
        setCurrentImgIndex((prev) => {
            const temp = prev - 1
            return temp < 0 ? slider.length - 1 : temp
        })
    }
    function goTo(index: number) {
        setCurrentImgIndex(index)
    }

    return {
        currentImgIndex,
        sliderLength: slider.length,
        next,
        back,
        goTo,
        isTextLeft: slider[currentImgIndex].isLeft,
        images: (
            <div>
                <CustomImage
                    desktopBg={desktopBg1}
                    mobileBg={mobileBg1}
                    isVisible={currentImgIndex === 0}
                />
                <CustomImage
                    desktopBg={desktopBg2}
                    mobileBg={mobileBg2}
                    isVisible={currentImgIndex === 1}
                />
                <CustomImage
                    desktopBg={desktopBg3}
                    mobileBg={mobileBg3}
                    isVisible={currentImgIndex === 2}
                />
            </div>
        ),
    }
}

export default useSlider
