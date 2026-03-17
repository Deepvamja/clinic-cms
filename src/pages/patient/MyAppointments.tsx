import { useEffect, useState } from "react"
import { getMyAppointments } from "../../api/appointmentApi"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../utils/format"

export default function MyAppointments() {

  const [data, setData] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getMyAppointments().then(setData)
  }, [])

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">My Appointments</h2>

        <button
          onClick={() => navigate("/patient/book")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
        >
          + Book Appointment
        </button>

      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-indigo-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Token</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {data.map((a) => (
              <tr key={a.id} className="border-t hover:bg-indigo-50 transition">

                <td className="p-4">{formatDate(a.appointmentDate)}</td>

                <td className="p-4">{a.timeSlot}</td>

                <td className="p-4 font-semibold">
                  #{a.queueEntry.tokenNumber}
                </td>

                <td className="p-4">
                  <span className={
                    "px-2 py-1 rounded text-white text-sm " +
                    (a.queueEntry.status === "waiting"
                      ? "bg-yellow-500"
                      : a.queueEntry.status === "done"
                        ? "bg-green-500"
                        : "bg-blue-500")
                  }>
                    {a.queueEntry.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => navigate(`/patient/appointment/${a.id}`)}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}