import { Outlet, useNavigate } from "react-router-dom"
import { getUser, logout } from "../utils/auth"

export default function DashboardLayout() {

    const user = getUser()
    const navigate = useNavigate()

    return (
        <div className="flex h-screen">

           
            <div className="w-64 bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900 text-white p-6 flex flex-col">

                <h2 className="text-2xl font-bold mb-8 tracking-wide">
                    Clinic CMS
                </h2>

                <p className="text-indigo-200 mb-6 capitalize">
                    {user?.role}
                </p>

                <div className="space-y-3 flex-1">

                    {user?.role === "admin" && (
                        <>
                            <NavBtn label="Dashboard" onClick={() => navigate("/admin")} />
                            <NavBtn label="Users" onClick={() => navigate("/admin/users")} />
                        </>
                    )}

                    {user?.role === "doctor" && (
                        <NavBtn label="Queue" onClick={() => navigate("/doctor")} />
                    )}

                    {user?.role === "patient" && (
                        <NavBtn label="Appointments" onClick={() => navigate("/patient")} />
                    )}

                    {user?.role === "receptionist" && (
                        <NavBtn label="Queue" onClick={() => navigate("/receptionist")} />
                    )}

                </div>

                <button
                    onClick={() => { logout(); navigate("/") }}
                    className="bg-red-500 hover:bg-red-600 transition p-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

          
            <div className="flex-1 p-8 overflow-auto">
                <Outlet />
            </div>

        </div>
    )
}

function NavBtn({ label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
        >
            {label}
        </button>
    )
}