import { useState } from "react"
import { bookAppointment } from "../../api/appointmentApi"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function BookAppointment() {

    const navigate = useNavigate()

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loading, setLoading] = useState(false)

    const today = new Date().toISOString().split("T")[0]

    const handleSubmit = async () => {

        if (!date || !time) {
            return toast.error("All fields required")
        }


        if (date < today) {
            return toast.error("Cannot book past date")
        }


        const regex = /^\d{2}:\d{2}-\d{2}:\d{2}$/
        if (!regex.test(time)) {
            return toast.error("Use HH:MM-HH:MM format")
        }

        try {
            setLoading(true)

            await bookAppointment({
                appointmentDate: date,
                timeSlot: time
            })

            toast.success("Appointment booked")
            navigate("/patient")

        } catch (err: any) {


            if (err.response?.data?.error?.includes("already")) {
                toast.error("Time slot already booked")
            } else {
                toast.error(err.response?.data?.error)
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">

                <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

                <input
                    type="date"
                    min={today}
                    className="w-full p-2 border mb-3"
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    placeholder="10:00-10:15"
                    className="w-full p-2 border mb-3"
                    onChange={(e) => setTime(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white p-2"
                >
                    {loading ? "Booking..." : "Book"}
                </button>

            </div>
        </div>
    )
}