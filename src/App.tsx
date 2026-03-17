import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import DashboardLayout from "./layouts/DashboardLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleRoute from "./components/RoleRoute"


import AdminDashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/Users"
import BookAppointment from "./pages/patient/BookAppointment"
import AppointmentDetails from "./pages/patient/AppointmentDetails"

import MyAppointments from "./pages/patient/MyAppointments"
import Prescriptions from "./pages/patient/Prescriptions"
import Reports from "./pages/patient/Reports"
import AddPrescription from "./pages/doctor/AddPrescription"
import AddReport from "./pages/doctor/AddReport"

import DoctorQueue from "./pages/doctor/Queue"
import CreateUser from "./pages/admin/CreateUser"
import ReceptionQueue from "./pages/receptionist/Queue"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >


        <Route path="/admin" element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>} />
        <Route path="/admin/users" element={<RoleRoute role="admin"><Users /></RoleRoute>} />
        <Route path="/admin/create-user" element={<RoleRoute role="admin"><CreateUser /></RoleRoute>} />


        <Route path="/patient" element={<RoleRoute role="patient"><MyAppointments /></RoleRoute>} />
        <Route path="/patient/prescriptions" element={<RoleRoute role="patient"><Prescriptions /></RoleRoute>} />
        <Route path="/patient/reports" element={<RoleRoute role="patient"><Reports /></RoleRoute>} />
        <Route path="/patient/book" element={<RoleRoute role="patient"><BookAppointment /></RoleRoute>} />

        <Route path="/patient/appointment/:id" element={<RoleRoute role="patient"><AppointmentDetails /></RoleRoute>} />


        <Route path="/doctor" element={<RoleRoute role="doctor"><DoctorQueue /></RoleRoute>} />
        <Route path="/doctor/prescription/:id" element={<RoleRoute role="doctor"><AddPrescription /></RoleRoute>} />
        <Route path="/doctor/report/:id" element={<RoleRoute role="doctor"><AddReport /></RoleRoute>} />


        <Route path="/receptionist" element={<RoleRoute role="receptionist"><ReceptionQueue /></RoleRoute>} />

      </Route>

    </Routes>
  )
}

export default App