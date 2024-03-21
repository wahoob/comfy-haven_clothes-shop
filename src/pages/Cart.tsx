import { FaRegTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import useGlobalContext from "../useGlobalContext"

const Cart = () => {
    const { cart, total, toggleCartQty, deleteItemFromCart } =
        useGlobalContext()
    return (
        <div className="py-8 px-8 md:px-16 lg:px-32">
            <p className="text-gray-500 font-medium text-sm mb-14">
                <Link to="/">Home</Link>{" "}
                <span className="text-gray-500 font-semibold">/</span>
                <span className="text-gray-700 font-semibold capitalize">
                    Shopping Cart
                </span>
            </p>
            <div className="grid grid-cols-4 place-items-center text-base md:text-lg font-medium lg:px-16 pb-3 border-b">
                <h4>Product</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Total</h4>
            </div>
            <div>
                {cart.map((item) => {
                    const { id, price, quantity, title } = item
                    return (
                        <div
                            key={id}
                            className="relative grid gap-2 grid-cols-4 place-items-center text-[0.6rem] md:text-sm text-neutral-700 px-4 lg:px-16 py-6 border-b group cursor-pointer"
                        >
                            <Link
                                to={`/products/${id}`}
                                className="line-clamp-4 text-center cursor-pointer hover:text-neutral-950 font-semibold"
                            >
                                {title}
                            </Link>
                            <p>${price}</p>
                            <div className="flex max-sm:flex-col items-center gap-2">
                                <button
                                    className="bg-gray-100 hover:bg-gray-200 text-base px-2 rounded"
                                    onClick={() =>
                                        toggleCartQty(id, "decrease")
                                    }
                                >
                                    -
                                </button>
                                <p>{quantity}</p>
                                <button
                                    className="bg-gray-100 hover:bg-gray-200 text-base px-2 rounded"
                                    onClick={() =>
                                        toggleCartQty(id, "increase")
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <p className="font-medium">
                                ${(quantity * price).toFixed(2)}
                            </p>
                            <div
                                className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 p-2 rounded-sm cursor-pointer sm:opacity-0 group-hover:opacity-100"
                                onClick={() => deleteItemFromCart(id)}
                            >
                                <FaRegTrashAlt className="text-white" />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-16 text-sm">
                <h1 className="text-4xl font-semibold mb-6">Cart Totals</h1>
                <div className="flex items-center justify-between py-3 border-b text-gray-600">
                    <p>Subtotal</p>
                    <p>${total}</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b text-gray-600">
                    <p>Shipping Fee</p>
                    <p>$5</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                    <p className="text-neutral-950 font-semibold">Total</p>
                    <p className="font-semibold">
                        ${total > 0 ? total + 5 : 0}
                    </p>
                </div>
                <button className="uppercase px-8 py-3 text-white transition-colors bg-cyan-800 hover:bg-cyan-900 whitespace-nowrap mt-8">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default Cart
