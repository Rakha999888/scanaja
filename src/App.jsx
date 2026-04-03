import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginSelect from './pages/LoginSelect'
import LoginAdmin from './pages/LoginAdmin'
import LoginUser from './pages/LoginUser'
import RegisterUser from './pages/RegisterUser'
import Profile from './pages/Profile'
import QRCodePage from './pages/QRCode'
import AdminDashboard from './pages/AdminDashboard'
import ScanAbsensi from './pages/ScanAbsensi'
import DashboardKehadiran from './pages/DashboardKehadiran'
import NotFound from './pages/NotFound'

function UserRoute({ children }) {
  return localStorage.getItem('scanaja_email') ? children : <Navigate to="/login/user" replace />
}

function AdminRoute({ children }) {
  return localStorage.getItem('scanaja_admin') ? children : <Navigate to="/login/admin" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSelect />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
        <Route path="/qrcode" element={<UserRoute><QRCodePage /></UserRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/scan" element={<AdminRoute><ScanAbsensi /></AdminRoute>} />
        <Route path="/admin/kehadiran" element={<AdminRoute><DashboardKehadiran /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
