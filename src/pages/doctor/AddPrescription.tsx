import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { addPrescription } from "../../api/prescriptionApi"
import toast from "react-hot-toast"

export default function AddPrescription() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        dosage: "",
        duration: "",
        notes: ""
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {

        if (!form.name || !form.dosage || !form.duration) {
            return toast.error("All medicine fields are required")
        }

        try {
            setLoading(true)

            await addPrescription(Number(id), {
                medicines: [
                    {
                        name: form.name,
                        dosage: form.dosage,
                        duration: form.duration
                    }
                ],
                notes: form.notes
            })

            toast.success("Prescription added")
            navigate("/doctor")

        } catch (err: any) {

            const msg = err?.response?.data?.error || ""


            if (msg.includes("status")) {
                toast.error("Allowed only when appointment is in-progress or done")
            } else if (msg.includes("duplicate")) {
                toast.error("Prescription already exists")
            } else {
                toast.error(msg || "Failed to add prescription")
            }

        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Prescription
                </h2>

                <div className="space-y-4">

                    <input
                        placeholder="Medicine Name"
                        className="input"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        placeholder="Dosage (500mg)"
                        className="input"
                        onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                    />

                    <input
                        placeholder="Duration (5 days)"
                        className="input"
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />

                    <textarea
                        placeholder="Notes"
                        className="input"
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                </div>

            </div>

        </div>
    )
}