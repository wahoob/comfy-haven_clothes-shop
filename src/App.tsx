import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Home, About, Products, Cart, SingleProduct, NoMatch } from "./pages"
import { Navbar, Header, Footer, FlyingCart } from "./containers"

const App = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    return (
        <div className="relative">
            <Header />
            <Navbar />
            <FlyingCart />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<SingleProduct />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
