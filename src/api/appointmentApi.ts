import api from "./axios"

export const bookAppointment = async (data: any) => {
    const res = await api.post("/appointments", data)
    return res.data
}

export const getMyAppointments = async () => {
    const res = await api.get("/appointments/my")
    return res.data
}

export const getAppointmentById = async (id: number) => {
    const res = await api.get(`/appointments/${id}`)
    return res.data
}