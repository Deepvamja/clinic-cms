import { useState } from "react"
import { createUser } from "../../api/adminApi"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function CreateUser() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "doctor",
        phone: ""
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {

        if (!form.name || !form.email || !form.password) {
            return toast.error("Please fill all required fields")
        }

        try {
            setLoading(true)

            await createUser(form)

            toast.success("User created successfully")
            navigate("/admin/users")

        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Failed to create user")
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create User
                </h2>

                <div className="space-y-4">


                    <input
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                        <option value="receptionist">Receptionist</option>
                    </select>


                    <input
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />


                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create User"}
                    </button>

                </div>

            </div>

        </div>
    )
}