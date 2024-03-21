import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import useGlobalContext from "../useGlobalContext"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

const FlyingCart = () => {
    const {
        qty,
        cart,
        total,
        isSidebarOpen,
        closeSidebar,
        toggleCartQty,
        deleteItemFromCart,
        clearCart,
    } = useGlobalContext()

    const container = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!container.current?.contains(e.target as Node)) {
                closeSidebar()
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [closeSidebar])

    return (
        <div
            className={`fixed z-30 transition-all duration-300 ${
                isSidebarOpen ? "right-0" : "-right-full"
            } top-0 bottom-0 py-4 px-6 flex flex-col w-full sm:w-3/4 lg:w-1/3 bg-white`}
            ref={container}
        >
            <div className="flex justify-between items-center border-b pb-3">
                <p className="font-semibold text-sm">SHIPPING BAG ({qty})</p>
                <FaArrowRight
                    className="cursor-pointer text-neutral-700 hover:text-neutral-950"
                    onClick={() => closeSidebar()}
                />
            </div>
            <div className="flex-1 py-4 overflow-y-auto">
                {cart.map((item) => {
                    const { id, image, price, quantity, title } = item
                    return (
                        <div
                            key={id}
                            className="flex gap-4 px-2 items-center border-b py-4 h-[150px]"
                        >
                            <div className="basis-1/5 max-w-20">
                                <img src={image} alt={title} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <Link
                                        to={`/products/${id}`}
                                        className="text-xs sm:text-sm font-medium line-clamp-2 basis-2/3"
                                    >
                                        {title}
                                    </Link>
                                    <RxCross2
                                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                                        onClick={() => deleteItemFromCart(id)}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3 border px-2.5">
                                        <button
                                            className="text-gray-500 hover:text-gray-700 text-lg"
                                            onClick={() =>
                                                toggleCartQty(id, "decrease")
                                            }
                                        >
                                            -
                                        </button>
                                        <p className="">{quantity}</p>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 text-lg"
                                            onClick={() =>
                                                toggleCartQty(id, "increase")
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="max-sm:text-xs text-gray-500">
                                        $ {price}
                                    </p>
                                    <p className="font-medium max-sm:text-xs">
                                        $ {(price * quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center py-6 border-t">
                    <p className="text-sm font-semibold">TOTAL: ${total}</p>
                    <div
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-sm cursor-pointer"
                        onClick={() => {
                            clearCart()
                            closeSidebar()
                        }}
                    >
                        <FaRegTrashAlt className="text-white size-4" />
                    </div>
                </div>
                <Link
                    to="/cart"
                    className="text-neutral-800 bg-gray-200 hover:bg-gray-300 text-center py-3 rounded font-medium"
                    onClick={() => closeSidebar()}
                >
                    View Cart
                </Link>
                <Link
                    to="/cart"
                    className="text-white bg-neutral-800 hover:bg-neutral-950 text-center py-3 rounded font-medium mt-4"
                    onClick={() => closeSidebar()}
                >
                    Checkout
                </Link>
            </div>
        </div>
    )
}

export default FlyingCart
