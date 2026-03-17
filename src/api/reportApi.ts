import axios from "axios"

const API = "https://cmsback.sampaarsh.cloud"


export const addReport = async (appointmentId: number, data: any) => {

    const token = localStorage.getItem("token")

    const res = await axios.post(
        `${API}/reports/${appointmentId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}

export const getMyReports = async () => {

    const token = localStorage.getItem("token")

    const res = await axios.get(
        `${API}/reports/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}