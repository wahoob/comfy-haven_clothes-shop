type LoaderProps = {
    className: string
}

const Loader = ({ className }: LoaderProps) => {
    return <div className={`loader mx-auto ${className}`}></div>
}

export default Loader
