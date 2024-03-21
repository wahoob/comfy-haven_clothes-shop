import { IoIosMenu } from "react-icons/io"
import { IoGrid } from "react-icons/io5"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import useGlobalContext from "../useGlobalContext"
import { createRef, useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Product, Loader } from "../components"

const Products = () => {
    const {
        categories,
        products,
        filterBy,
        sortType,
        isLoading,
        filterProducts,
        sortProducts,
    } = useGlobalContext()
    const [isGrid, setIsGrid] = useState(true)

    const [isAsc, setIsAsc] = useState(true)
    useEffect(() => {
        setIsAsc(sortType === "asc")
    }, [sortType])

    const container = useRef<HTMLDivElement>(null)
    const productRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
        products.map(() => createRef())
    )
    useGSAP(
        (_, contextSafe) => {
            const observer = new IntersectionObserver((entries) => {
                const targets = entries
                    .filter((entry) => entry.isIntersecting)
                    .map((entry) => {
                        observer.unobserve(entry.target)
                        return entry.target
                    })

                const animationPlay = contextSafe!(() => {
                    gsap.from(targets, {
                        opacity: 0,
                        stagger: 0.2,
                    })
                })

                animationPlay()
            })

            productRefs.current.forEach((ref) => {
                if (ref.current) observer.observe(ref.current)
            })

            return () => observer.disconnect()
        },
        { dependencies: [products, sortType], scope: container }
    )

    return (
        <div className="py-3 px-8 md:px-16 lg:px-32 flex gap-10 relative min-h-screen max-sm:flex-col">
            <div className="flex flex-col items-start gap-5 basis-1/6 sm:sticky top-[4.75rem] h-full">
                <div className="flex flex-col gap-3 w-full">
                    <h4 className="md:text-lg font-semibold tracking-wider border-b-2 pb-1">
                        Category
                    </h4>
                    <ul className="flex flex-col gap-2">
                        {isLoading ? (
                            <Loader className="text-lg max-md:text-sm" />
                        ) : (
                            categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={`text-gray-400 hover:text-gray-500 max-md:text-sm capitalize whitespace-nowrap cursor-pointer ${
                                        category === filterBy &&
                                        "underline text-gray-500 hover:text-gray-700"
                                    }`}
                                    onClick={() => filterProducts(category)}
                                >
                                    {category}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <button
                    className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 text-sm rounded"
                    onClick={() => filterProducts("all")}
                >
                    Clear Filters
                </button>
            </div>
            <div className="flex-1">
                <div className="flex items-center flex-wrap justify-between gap-5 max-md:text-sm">
                    <div className="flex items-center flex-wrap gap-8">
                        <div className="flex gap-2">
                            <div
                                className={`bg-gray-200 hover:bg-gray-300 p-1 rounded-md cursor-pointer transition-colors duration-300 ${
                                    isGrid &&
                                    "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                                }`}
                                onClick={() => setIsGrid(true)}
                            >
                                <IoGrid className="size-5" />
                            </div>
                            <div
                                className={`bg-gray-200 hover:bg-gray-300 p-1 rounded-md cursor-pointer transition-colors duration-300 ${
                                    !isGrid &&
                                    "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                                }`}
                                onClick={() => setIsGrid(false)}
                            >
                                <IoIosMenu className="size-5" />
                            </div>
                        </div>
                        <p className="text-gray-600">
                            {products.length} Products Found
                        </p>
                    </div>
                    <hr className="flex-1 border border-gray-300" />
                    <div className="flex items-center gap-3">
                        <p className="whitespace-nowrap">Sorting</p>
                        <div className="flex items-center gap-1">
                            <div className="relative w-24 h-8 max-md:h-7 overflow-hidden">
                                <p
                                    className={`font-medium absolute transition-all duration-300 -translate-y-1/2 ${
                                        isAsc ? "top-10" : "top-1/2"
                                    }`}
                                >
                                    Descending
                                </p>
                                <p
                                    className={`font-medium absolute transition-all duration-300 -translate-y-1/2 ${
                                        isAsc ? "top-1/2" : "-top-3"
                                    }`}
                                >
                                    Ascending
                                </p>
                            </div>
                            <div>
                                <FaCaretUp
                                    className="cursor-pointer hover:text-neutral-500"
                                    onClick={() => sortProducts("asc")}
                                />
                                <FaCaretDown
                                    className="cursor-pointer hover:text-neutral-500"
                                    onClick={() => sortProducts("desc")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`grid ${
                        isGrid
                            ? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
                            : "grid-cols-1"
                    } gap-y-8 gap-6 py-8`}
                    ref={container}
                >
                    {isLoading ? (
                        <Loader className="text-xl" />
                    ) : (
                        products.map((item, idx) => (
                            <div
                                key={item.id}
                                className="product"
                                ref={productRefs.current[idx]}
                            >
                                <Product
                                    item={item}
                                    type={isGrid ? "grid" : "menu"}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products
