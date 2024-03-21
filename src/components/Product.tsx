import { IoMdEye, IoMdHeart } from "react-icons/io"
import { Link } from "react-router-dom"
import { Stars } from "../components"
import { ProductProps } from "../context"
import useGlobalContext from "../useGlobalContext"

type ProductComponentProps = {
    item: ProductProps
    type: "grid" | "menu"
}

const Product = ({ item, type }: ProductComponentProps) => {
    const { id, image, title, category, rating, price, description } = item
    const { addItemToCart } = useGlobalContext()
    const isGrid = type === "grid"

    return (
        <div
            className={`flex ${
                isGrid ? "flex-col gap-3" : "gap-5 flex-wrap"
            } min-h-full`}
        >
            <div
                className={`${
                    isGrid ? "min-w-44" : "min-w-64"
                } py-16 flex flex-1 justify-center items-center border rounded shadow-inner cursor-default relative overflow-hidden group`}
            >
                <img src={image} alt={title} className="w-auto h-32" />
                <div className="absolute transition-all duration-300 group-hover:right-4 max-sm:right-4 -right-12 top-4 flex flex-col gap-2">
                    <div
                        className="px-1 py-2 bg-red-500 flex justify-center items-center shadow-md shadow-neutral-300 cursor-pointer transition-colors hover:bg-red-600"
                        onClick={() => {
                            addItemToCart(id, item)
                        }}
                    >
                        <IoMdHeart className="size-6 text-white" />
                    </div>
                    <Link
                        to={`/products/${id}`}
                        className="p-1 shadow-lg shadow-neutral-300 flex justify-center items-center cursor-pointer transition-colors bg-white hover:bg-gray-50"
                    >
                        <IoMdEye className="size-8" />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-56">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="capitalize text-neutral-400 font-medium">
                        {category}
                    </p>
                    <Stars rating={rating.rate} />
                </div>
                <div className="flex flex-col gap-1">
                    <Link
                        to={`/products/${id}`}
                        className={`line-clamp-1 text-neutral-700 font-medium cursor-pointer ${
                            !isGrid && "text-xl font-semibold"
                        }`}
                    >
                        {title}
                    </Link>
                    <p
                        className={`font-semibold ${
                            isGrid ? "text-neutral-700" : "text-yellow-700"
                        }`}
                    >
                        $ {price}
                    </p>
                </div>
                {!isGrid && (
                    <div className="line-clamp-2 mt-4 text-sm text-neutral-900">
                        {description}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Product
