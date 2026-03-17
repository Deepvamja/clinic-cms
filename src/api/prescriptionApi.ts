import axios from "axios"

const API = "https://cmsback.sampaarsh.cloud"


export const addPrescription = async (appointmentId: number, data: any) => {

    const token = localStorage.getItem("token")

    const res = await axios.post(
        `${API}/prescriptions/${appointmentId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}


export const getMyPrescriptions = async () => {

    const token = localStorage.getItem("token")

    const res = await axios.get(
        `${API}/prescriptions/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}