import { useEffect, useState } from "react"
import { getClinicInfo } from "../../api/adminApi"

export default function Dashboard() {

    const [clinic, setClinic] = useState<any>(null)

    useEffect(() => {
        getClinicInfo().then(setClinic)
    }, [])

    return (

        <div className="p-8">

            <h2 className="text-3xl font-bold mb-8">
                Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                
                <Card title="Users" value={clinic?.userCount} />

               
                <Card title="Appointments" value={clinic?.appointmentCount} />

               
                <Card title="Queue" value={clinic?.queueCount} />

              
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md text-center">

                    <p className="text-sm opacity-80 mb-2">Clinic</p>

                    {clinic ? (
                        <>
                            <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                                {clinic.name}
                            </h3>

                            <p className="text-xs mt-2 opacity-80">
                                {clinic.code}
                            </p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>

            </div>

        </div>
    )
}

function Card({ title, value }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">

            <p className="text-gray-500 text-sm mb-2">
                {title}
            </p>

            <h3 className="text-3xl font-bold">
                {value ?? 0}
            </h3>

        </div>
    )
}