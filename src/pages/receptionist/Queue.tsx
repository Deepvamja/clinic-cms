import { useState } from "react"
import { getQueueByDate, updateQueueStatus } from "../../api/queueApi"
import toast from "react-hot-toast"

export default function QueuePage() {

    const [date, setDate] = useState("")
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const loadQueue = async () => {
        if (!date) return toast.error("Select a date")

        try {
            setLoading(true)
            const res = await getQueueByDate(date)
            setData(res)
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Failed to load queue")
            setData([])
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: number, current: string, next: string) => {


        if (current === "waiting" && !["in-progress", "skipped"].includes(next)) {
            return toast.error("Invalid transition from waiting")
        }

        if (current === "in_progress" && next !== "done") {
            return toast.error("Only DONE allowed from in-progress")
        }

        if (["done", "skipped"].includes(current)) {
            return toast.error("No further updates allowed")
        }

        try {
            await updateQueueStatus(id, next)
            toast.success("Status updated")
            loadQueue()
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Update failed")
        }
    }

    const getStatusBadge = (status: string) => {
        if (status === "waiting") return "bg-yellow-100 text-yellow-700"
        if (status === "in_progress") return "bg-blue-100 text-blue-700"
        if (status === "done") return "bg-green-100 text-green-700"
        return "bg-gray-100 text-gray-600"
    }

    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">Daily Queue</h2>

                <div className="flex gap-3">

                    <input
                        type="date"
                        className="input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button
                        onClick={loadQueue}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 rounded-lg hover:scale-105 transition"
                    >
                        Load
                    </button>

                </div>

            </div>

            {!loading && data.length === 0 && (
                <div className="text-center mt-20 text-gray-500">
                    <p className="text-lg">No queue for selected date</p>
                </div>
            )}

            {loading && (
                <p className="text-center text-gray-500">Loading...</p>
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
                                {item.appointment.patient.name}
                            </p>

                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(item.status)}`}>
                                {item.status.replace("_", " ")}
                            </span>

                        </div>

                        <div className="flex gap-2">

                            {item.status === "waiting" && (
                                <>
                                    <button
                                        onClick={() => updateStatus(item.id, item.status, "in-progress")}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105"
                                    >
                                        Start
                                    </button>

                                    <button
                                        onClick={() => updateStatus(item.id, item.status, "skipped")}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:scale-105"
                                    >
                                        Skip
                                    </button>
                                </>
                            )}

                            {item.status === "in_progress" && (
                                <button
                                    onClick={() => updateStatus(item.id, item.status, "done")}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-105"
                                >
                                    Done
                                </button>
                            )}

                            {item.status === "done" && (
                                <span className="text-green-600 font-medium">Completed</span>
                            )}

                            {item.status === "skipped" && (
                                <span className="text-gray-500">Skipped</span>
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}