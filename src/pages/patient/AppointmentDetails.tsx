import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAppointmentById } from "../../api/appointmentApi"
import { formatDate } from "../../utils/format"

export default function AppointmentDetails() {

    const { id } = useParams()
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        getAppointmentById(Number(id)).then(setData)
    }, [])

    if (!data) return <p>Loading...</p>

    return (

        <div className="max-w-2xl mx-auto">

            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">

                <h2 className="text-2xl font-bold mb-6">
                    Appointment Details
                </h2>

                <p><b>Date:</b> {formatDate(data.appointmentDate)}</p>
                <p><b>Time:</b> {data.timeSlot}</p>

                <div className="mt-6">

                    <h3 className="font-semibold mb-2">Prescription</h3>

                    {data.prescription ? (
                        <ul className="list-disc ml-5">
                            {data.prescription.medicines.map((m: any, i: number) => (
                                <li key={i}>
                                    {m.name} - {m.dosage} ({m.duration})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No prescription yet</p>
                    )}

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold mb-2">Report</h3>

                    {data.report ? (
                        <div>
                            <p><b>Diagnosis:</b> {data.report.diagnosis}</p>
                            <p><b>Test:</b> {data.report.testRecommended}</p>
                            <p><b>Remarks:</b> {data.report.remarks}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No report yet</p>
                    )}

                </div>

            </div>

        </div>
    )
}