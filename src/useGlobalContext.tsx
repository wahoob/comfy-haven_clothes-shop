import { useContext } from "react"
import { AppContext } from "./context"

const useGlobalContext = () => {
    return useContext(AppContext)
}

export default useGlobalContext
