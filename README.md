# 🏥 Clinic Queue Management System (CMS)

A full-stack, multi-tenant clinic management system built using modern web technologies.
This project implements role-based workflows for Admin, Patient, Doctor, and Receptionist using a real production API.

---

## 🚀 Live API

Base URL:
https://cmsback.sampaarsh.cloud

---

## 🔐 Demo Credentials

```txt
Email: enrollment@darshan.ac.in
Password: password123
```

---

## 📌 Features

### 👨‍💼 Admin

* View clinic details (name, code, stats)
* Manage users (Doctor, Patient, Receptionist)
* Create new users with role-based access

---

### 👤 Patient

* Book appointments (future dates only)
* View appointment history with queue token & status
* View prescriptions and medical reports

---

### 🧑‍⚕️ Doctor

* View today’s patient queue
* Add prescription (medicines, dosage, duration, notes)
* Add medical reports (diagnosis, tests, remarks)

---

### 🧑‍💼 Receptionist

* View daily queue by date
* Update queue status:

  * waiting → in-progress / skipped
  * in-progress → done

---

## 🧠 Key Concepts

* Multi-tenant system (data scoped by clinicId)
* Role-based access control (RBAC)
* Queue management using token system
* Appointment lifecycle tracking
* Strict API rule enforcement

---

## ⚙️ Tech Stack

* Frontend: React.js (Vite)
* Styling: Tailwind CSS
* State: React Hooks
* Routing: React Router
* API Handling: Axios
* Notifications: react-hot-toast

---

## 📂 Project Structure

```bash
src/
│── api/               # API services (axios + endpoints)
│── components/        # Reusable UI components
│── layouts/           # Dashboard layout
│── pages/
│   ├── admin/
│   ├── doctor/
│   ├── patient/
│   └── receptionist/
│── utils/             # Auth utilities
│── App.tsx
│── main.tsx
```

---

## 🔄 Workflow

1. Admin creates users
2. Patient books appointment
3. Receptionist manages queue
4. Doctor adds prescription/report
5. Patient views results

---

## 📡 API Coverage

All required endpoints are implemented:

* Auth → `/auth/login`
* Admin → `/admin/clinic`, `/admin/users`
* Appointments → `/appointments`, `/appointments/my`, `/appointments/:id`
* Queue → `/queue`, `/queue/:id`
* Doctor → `/doctor/queue`
* Prescriptions → `/prescriptions`
* Reports → `/reports`

---

## ✅ Validations & Rules Implemented

* No past date booking
* Unique time slot per clinic per date
* Strict queue status transitions
* Prescription/report allowed only for valid appointment status
* Role-based route protection

---

## 🛠 Installation

```bash
git clone https://github.com/your-username/clinic-cms.git
cd clinic-cms
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* Login returns JWT token
* Token stored in localStorage
* Axios interceptor attaches token automatically
* Auto logout on invalid/expired token





---
