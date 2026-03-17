import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, LogOut } from "lucide-react"

export default function Sidebar() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const linkClass = ({ isActive }: any) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition 
     ${isActive
            ? "bg-white text-purple-600 font-semibold shadow"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`

    return (

        <div className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 p-5 flex flex-col justify-between">

            <div>

                <h1 className="text-2xl font-bold text-white mb-10">
                    Clinic CMS
                </h1>

                <nav className="flex flex-col gap-2">

                    <NavLink to="/admin" className={linkClass}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/users" className={linkClass}>
                        <Users size={18} />
                        Users
                    </NavLink>

                </nav>

            </div>

            <button
                onClick={logout}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
            >
                <LogOut size={18} />
                Logout
            </button>

        </div>
    )
}