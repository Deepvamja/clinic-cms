import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { addReport } from "../../api/reportApi"

export default function AddReport() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        diagnosis: "",
        testRecommended: "",
        remarks: ""
    })

    const handleSubmit = async () => {
        await addReport(Number(id), form)
        navigate("/doctor")
    }

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Report
                </h2>

                <div className="space-y-4">

                    <input placeholder="Diagnosis" className="input"
                        onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} />

                    <input placeholder="Test Recommended" className="input"
                        onChange={(e) => setForm({ ...form, testRecommended: e.target.value })} />

                    <textarea placeholder="Remarks" className="input"
                        onChange={(e) => setForm({ ...form, remarks: e.target.value })} />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg hover:scale-105"
                    >
                        Submit
                    </button>

                </div>

            </div>

        </div>
    )
}