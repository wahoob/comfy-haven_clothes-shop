import { useEffect, useState } from "react"
import { ProductProps } from "../context"
import { Link } from "react-router-dom"
import { Product, Loader } from "../components"

const FeaturedStyles = () => {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState(false)
    async function fetchProductsData(limit: number) {
        setLoading(true)
        const response = await fetch(
            `https://fakestoreapi.com/products?limit=${limit}`
        )
        const data = await response.json()
        setProducts(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchProductsData(4)
    }, [])
    return (
        <div className="py-24 px-8 md:px-16 lg:px-32 flex flex-col gap-14">
            <div className="relative mx-auto">
                <h1 className="text-neutral-900 text-5xl font-semibold text-center max-sm:text-4xl">
                    Featured Styles
                </h1>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-900 h-2 w-24 rounded-md" />
            </div>
            {loading ? (
                <Loader className="text-xl" />
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {products.map((item) => {
                        return <Product key={item.id} item={item} type="grid" />
                    })}
                </div>
            )}
            <Link
                to="/products"
                className="uppercase px-7 py-2 rounded-md bg-cyan-800 text-white mx-auto transition-colors hover:bg-cyan-900"
            >
                All Products
            </Link>
        </div>
    )
}

export default FeaturedStyles
