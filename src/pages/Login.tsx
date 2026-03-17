import { useState } from "react"
import { loginApi } from "../api/authApi"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Please enter email and password")
            return
        }

        try {
            setLoading(true)

            const res = await loginApi(email, password)

            localStorage.setItem("token", res.token)
            localStorage.setItem("user", JSON.stringify(res.user))

            switch (res.user.role) {
                case "admin":
                    navigate("/admin")
                    break
                case "doctor":
                    navigate("/doctor")
                    break
                case "patient":
                    navigate("/patient")
                    break
                case "receptionist":
                    navigate("/receptionist")
                    break
            }

        } catch (err: any) {
            alert(err.response?.data?.error || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">

            <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-xl p-8 w-96">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Clinic CMS
                </h2>

                <p className="text-center text-white/80 mb-6">
                    Login to your account
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-xs text-white/70 text-center mt-4">
                    Use assigned credentials from admin
                </p>

            </div>

        </div>
    )
}