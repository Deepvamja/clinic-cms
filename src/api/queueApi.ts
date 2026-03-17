import axios from "axios"

const API = "https://cmsback.sampaarsh.cloud"


export const getQueueByDate = async (date: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.get(`${API}/queue?date=${date}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.data
}

export const updateQueueStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.patch(
        `${API}/queue/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}