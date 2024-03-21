const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className="bg-neutral-900 flex justify-center items-center p-6 border-t-2">
            <p className="text-white text-center">
                <span>&copy;</span> {year}{" "}
                <span className="text-cyan-800 font-medium">Comfy Haven</span>{" "}
                All rights reserved
            </p>
        </div>
    )
}

export default Footer
