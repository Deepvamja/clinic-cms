import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create({
    baseURL: "https://cmsback.sampaarsh.cloud"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (err) => {

        const status = err.response?.status
        const msg = err.response?.data?.error || "Something went wrong"

        if (status === 401) {
            toast.error("Session expired. Login again")
            localStorage.clear()
            window.location.href = "/"
        }

        if (status === 403) {
            toast.error("Access denied")
        }

        if (status === 400) {
            toast.error(msg)
        }

        return Promise.reject(err)
    }
)

export default api