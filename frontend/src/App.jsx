import { useState, useEffect } from "react"
import { supabase } from "./supabase"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ScreeningTool from "./pages/ScreeningTool"
import History from "./History"

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (_event === "PASSWORD_RECOVERY") {
        window.location.hash = "#/reset-password"
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (authLoading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  )

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
        {/* Ambient Glows for Frosted Glassmorphism */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Top-center electric indigo / sky blue glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gradient-to-b from-indigo-500/15 via-blue-500/10 to-transparent rounded-full blur-[130px]" />
          {/* Mid-right soft emerald glow for positive outcome aura */}
          <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-emerald-500/[0.07] rounded-full blur-[140px]" />
          {/* Bottom-left soft cyan/blue accent */}
          <div className="absolute -bottom-20 -left-32 w-[520px] h-[520px] bg-cyan-500/[0.06] rounded-full blur-[130px]" />
        </div>

        <Navbar user={user} />
        <div className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tool" element={<ScreeningTool user={user} />} />
            <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/tool" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/tool" />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/history" element={user ? <History user={user} onBack={() => window.history.back()} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}