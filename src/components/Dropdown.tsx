import { useState } from "react"
import { FaAngleDown } from "react-icons/fa6"

type DropdownProps = {
    dropdownHeader: string
    dropdownValues: string[]
}

const Dropdown = ({ dropdownHeader, dropdownValues }: DropdownProps) => {
    const [expand, setExpand] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number>()

    const handleClick = () => {
        setExpand((prev) => !prev)
    }
    const handleSelectingValue = (index: number) => {
        setSelectedIndex(index)
        setExpand(false)
    }

    return (
        <div className="relative max-w-56 w-full">
            <div
                className={`flex justify-between items-center gap-2 border shadow-inner px-3 py-2.5 h-12 cursor-pointer transition-all duration-300 ${
                    expand && "rounded-t-md"
                }`}
                onClick={handleClick}
            >
                <p>
                    {selectedIndex
                        ? dropdownValues[selectedIndex]
                        : dropdownHeader}
                </p>
                <FaAngleDown
                    className={`transition-transform duration-300 ${
                        expand && "rotate-180"
                    }`}
                />
            </div>
            {expand && (
                <div className="absolute z-20 top-12 w-full bg-white border border-t-0 rounded-b-md max-h-40 overflow-y-scroll">
                    {dropdownValues.map((value, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer px-3 py-2.5 transition-colors hover:bg-gray-200 ${
                                index === selectedIndex && "bg-gray-200"
                            }`}
                            onClick={() => handleSelectingValue(index)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
