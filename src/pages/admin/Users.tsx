import { useEffect, useState } from "react"
import { getUsers } from "../../api/adminApi"
import { useNavigate } from "react-router-dom"

export default function Users() {

    const [users, setUsers] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    return (

        <div className="p-8">

            <div className="flex justify-between mb-6">

                <h2 className="text-2xl font-bold">Users</h2>

                <button
                    onClick={() => navigate("/admin/create-user")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                    + Create User
                </button>

            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Phone</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((u, i) => (
                            <tr key={i} className="border-t">

                                <td className="p-4">{u.name}</td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4">{u.role}</td>
                                <td className="p-4">{u.phone || "-"}</td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}