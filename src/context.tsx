import {
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from "react"

type AppContextProps = {
    isLoading: boolean
    products: ProductProps[]
    categories: string[]
    filterBy: string
    sortType: string
    isSidebarOpen: boolean
    qty: number
    total: number
    cart: CartItemProps[]
    filterProducts: (category: string) => void
    addItemToCart: (id: number, product: ProductProps) => void
    deleteItemFromCart: (id: number) => void
    toggleCartQty: (id: number, type: "increase" | "decrease") => void
    clearCart: () => void
    sortProducts: (sortType: "asc" | "desc") => void
    closeSidebar: () => void
    openSidebar: () => void
}
export const AppContext = createContext<AppContextProps>({
    isLoading: false,
    products: [],
    categories: [],
    filterBy: "",
    sortType: "",
    isSidebarOpen: false,
    qty: 0,
    total: 0,
    cart: [],
    filterProducts: () => {},
    addItemToCart: () => {},
    deleteItemFromCart: () => {},
    toggleCartQty: () => {},
    clearCart: () => {},
    sortProducts: () => {},
    closeSidebar: () => {},
    openSidebar: () => {},
})

type AppProviderProps = {
    children: React.ReactNode
}

export type ProductProps = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}
type CartItemProps = {
    id: number
    image: string
    title: string
    price: number
    quantity: number
}
type StateProps = {
    total: number
    qty: number
    cart: CartItemProps[]
}
type ActionProps = {
    type:
        | "add_item"
        | "delete_item"
        | "toggle"
        | "clear"
        | "get_total"
        | "load_cart"
    payload?: {
        id?: number
        product?: ProductProps
        type?: "increase" | "decrease"
        cart?: CartItemProps[]
    }
}

const loadCartFromLocalStorage = (): CartItemProps[] => {
    const cartData = localStorage.getItem("cart")
    return cartData ? JSON.parse(cartData) : []
}
const initialState: StateProps = {
    total: 0,
    qty: 0,
    cart: loadCartFromLocalStorage(),
}
function reducer(state: StateProps, { type, payload }: ActionProps) {
    let updatedCart
    switch (type) {
        case "add_item": {
            const existingItem = state.cart.find(
                (item) => item.id === payload!.id
            )
            if (existingItem) {
                updatedCart = state.cart.map((item) => {
                    if (item.id === payload!.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            } else {
                const { id, title, image, price } = payload!.product!
                const newItem: CartItemProps = {
                    id,
                    title,
                    image,
                    price,
                    quantity: 1,
                }
                updatedCart = [...state.cart, newItem]
            }
            return { ...state, cart: updatedCart }
        }
        case "delete_item": {
            updatedCart = state.cart.filter((item) => item.id !== payload!.id)
            return { ...state, cart: updatedCart }
        }
        case "toggle": {
            updatedCart = state.cart
                .map((item) => {
                    if (item.id === payload!.id) {
                        const { quantity } = item
                        if (payload!.type === "increase") {
                            return { ...item, quantity: quantity + 1 }
                        } else if (payload!.type === "decrease") {
                            return { ...item, quantity: quantity - 1 }
                        }
                    }
                    return item
                })
                .filter((item) => item.quantity !== 0)
            return { ...state, cart: updatedCart }
        }
        case "clear": {
            return { ...state, cart: [] }
        }
        case "get_total": {
            const { amount, total } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem
                    cartTotal.amount += quantity
                    cartTotal.total += price * quantity
                    return cartTotal
                },
                {
                    amount: 0,
                    total: 0,
                }
            )
            return {
                ...state,
                total: parseFloat(total.toFixed(2)),
                qty: amount,
            }
        }
        default:
            return state
    }
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [categories, setCategories] = useState<string[]>([])
    const [products, setProducts] = useState<ProductProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState("all")
    const [sortType, setSortTpye] = useState<"asc" | "desc">("asc")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // handle the cart changes
    function addItemToCart(id: number, product: ProductProps) {
        dispatch({ type: "add_item", payload: { id, product } })
        dispatch({ type: "get_total" })
    }
    function deleteItemFromCart(id: number) {
        dispatch({ type: "delete_item", payload: { id } })
        dispatch({ type: "get_total" })
    }
    function toggleCartQty(id: number, type: "increase" | "decrease") {
        dispatch({ type: "toggle", payload: { id, type } })
        dispatch({ type: "get_total" })
    }
    function clearCart() {
        dispatch({ type: "clear" })
        dispatch({ type: "get_total" })
    }
    // save to local storage everytime the cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])

    // fetching data
    async function fetchCategories() {
        setIsLoading(true)
        const response = await fetch(
            "https://fakestoreapi.com/products/categories"
        )
        const data = await response.json()
        const tempData = data.filter((el: string) => el !== "electronics")
        setCategories(["all", ...tempData])
        setIsLoading(false)
    }
    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        const response = await fetch(
            `https://fakestoreapi.com/products?sort=${sortType}`
        )
        const data = await response.json()
        const tempData = data.filter(
            (el: ProductProps) => el.category !== "electronics"
        )
        setProducts(tempData)
        setIsLoading(false)
    }, [sortType])
    const getInCategory = useCallback(async () => {
        setIsLoading(true)
        const response = await fetch(
            `https://fakestoreapi.com/products/category/${filterBy}?sort=${sortType}`
        )
        const data = await response.json()
        const tempData = data.filter(
            (el: ProductProps) => el.category !== "electronics"
        )
        setProducts(tempData)
        setIsLoading(false)
    }, [filterBy, sortType])

    function filterProducts(category: string) {
        setFilterBy(category)
    }
    function sortProducts(sortType: "asc" | "desc") {
        setSortTpye(sortType)
    }

    // change the products when the user filter or sort the items
    useEffect(() => {
        if (filterBy === "all") {
            fetchProducts()
        } else {
            getInCategory()
        }
    }, [filterBy, sortType, fetchProducts, getInCategory])

    // fetch the categories once the component mounts
    useEffect(() => {
        fetchCategories()
        dispatch({ type: "get_total" })
    }, [])

    //closing the sidebar
    function closeSidebar() {
        setIsSidebarOpen(false)
    }
    function openSidebar() {
        setIsSidebarOpen(true)
    }

    // useEffect(() => {
    //     console.log(categories)
    // }, [categories])
    return (
        <AppContext.Provider
            value={{
                isLoading,
                products,
                categories,
                filterBy,
                sortType,
                isSidebarOpen,
                qty: state.qty,
                total: state.total,
                cart: state.cart,
                filterProducts,
                addItemToCart,
                deleteItemFromCart,
                toggleCartQty,
                clearCart,
                sortProducts,
                closeSidebar,
                openSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
