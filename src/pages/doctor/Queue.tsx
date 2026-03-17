import { useEffect, useState } from "react"
import { getDoctorQueue } from "../../api/doctorApi"
import { useNavigate } from "react-router-dom"

export default function DoctorQueue() {

    const [data, setData] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getDoctorQueue().then(setData)
    }, [])

    const getStatusBadge = (status: string) => {
        if (status === "waiting") return "bg-yellow-100 text-yellow-700"
        if (status === "in_progress") return "bg-blue-100 text-blue-700"
        if (status === "done") return "bg-green-100 text-green-700"
        return "bg-gray-100 text-gray-600"
    }

    return (

        <div className="p-6">

            <h2 className="text-3xl font-bold mb-8">Doctor Queue</h2>

            {data.length === 0 && (
                <p className="text-center text-gray-500">No patients today</p>
            )}

            <div className="grid gap-4">

                {data.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-xl transition"
                    >

                      
                        <div>

                            <p className="text-sm text-gray-500">
                                Token #{item.tokenNumber}
                            </p>

                            <p className="text-lg font-semibold">
                                {item.patientName}
                            </p>

                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(item.status)}`}>
                                {item.status.replace("_", " ")}
                            </span>

                        </div>

                       
                        <div className="flex gap-3">

                            <button
                                onClick={() => navigate(`/doctor/prescription/${item.appointmentId}`)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                            >
                                Prescription
                            </button>

                            <button
                                onClick={() => navigate(`/doctor/report/${item.appointmentId}`)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                            >
                                Report
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}