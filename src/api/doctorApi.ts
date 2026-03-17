import api from "./axios"

export const getDoctorQueue = async () => {
    const res = await api.get("/doctor/queue")
    return res.data
}