import { Link, useParams } from "react-router-dom"
import { ProductProps } from "../context"
import useGlobalContext from "../useGlobalContext"
import { useEffect, useState } from "react"
import { Stars, Loader, Dropdown } from "../components"

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const SingleProduct = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductProps | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { addItemToCart } = useGlobalContext()
    async function fetchSingleProduct(id: string) {
        setLoading(true)
        try {
            const response = await fetch(
                `https://fakestoreapi.com/products/${id}`
            )
            const data = await response.json()
            setProduct(data)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        id && fetchSingleProduct(id)
    }, [id])
    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 text-center pt-8 text-lg flex flex-col gap-4">
                <p>No Product Found</p>
                <Link
                    to="/products"
                    className="text-base transition-colors rounded-sm bg-cyan-800 hover:bg-cyan-900 text-white px-4 py-1 mx-auto"
                >
                    Go Back
                </Link>
            </div>
        )
    }
    if (loading || !product) {
        return (
            <div className="bg-gray-100 min-h-screen py-8">
                <Loader className="text-xl" />
            </div>
        )
    }
    return (
        <div className="bg-gray-100 py-8 px-8 lg:px-16">
            <div className="flex max-md:flex-col gap-6 bg-white rounded-lg shadow-lg shadow-neutral-200 px-4 py-8">
                <div className="relative lg:basis-1/3 flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-72 w-full h-auto"
                    />
                    <div className="size-12 max-sm:size-8 max-sm:text-[0.6rem] max-sm:-top-5 max-sm:-left-2 text-sm font-medium flex justify-center items-center rounded-full bg-orange-500 text-white absolute top-0 left-0">
                        -24%
                    </div>
                </div>
                <div className="flex flex-col gap-16 flex-1 pr-4">
                    <div className="flex flex-col gap-4 items-start">
                        <p className="text-gray-500 font-medium text-sm">
                            <Link to="/">Home</Link>{" "}
                            <span className="text-gray-500 font-semibold">
                                /
                            </span>{" "}
                            <Link to="/products">Shop</Link>{" "}
                            <span className="text-gray-500 font-semibold">
                                /
                            </span>{" "}
                            <span className="text-gray-700 font-semibold capitalize">
                                {product.category}
                            </span>
                        </p>
                        <h1 className="text-neutral-800 text-3xl font-bold text-center">
                            {product.title}
                        </h1>
                        <div className="flex gap-2 items-start">
                            <Stars rating={product.rating.rate} />
                            <p className="text-[0.8rem] text-cyan-950">
                                ({product.rating.count})
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <h3 className="line-through text-gray-500 text-lg">
                                ${(product.price + 10).toFixed(2)}
                            </h3>
                            <h3 className="text-cyan-800 font-medium text-xl">
                                ${product.price}
                            </h3>
                        </div>
                        <p className="w-full max-w-3xl text-sm max-md:text-center">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-8 items-start">
                        <Dropdown
                            dropdownHeader="Select Size"
                            dropdownValues={sizes}
                        />
                        <button
                            className="uppercase text-sm bg-cyan-800 text-white px-7 py-3 max-md:mx-auto"
                            onClick={() => addItemToCart(product.id, product)}
                        >
                            Add To Cart
                        </button>
                        <p className="text-sm text-gray-600 capitalize">
                            <span className="text-neutral-800">Category: </span>{" "}
                            {product.category}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
