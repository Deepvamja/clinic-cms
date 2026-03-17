import { Navigate } from "react-router-dom"

export default function RoleRoute({ children, role }: any) {

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  if (!user?.role) {
    return <Navigate to="/" />
  }

  if (user.role !== role) {

    switch (user.role) {
      case "admin": return <Navigate to="/admin" />
      case "doctor": return <Navigate to="/doctor" />
      case "patient": return <Navigate to="/patient" />
      case "receptionist": return <Navigate to="/receptionist" />
      default: return <Navigate to="/" />
    }
  }

  return children
}