import LoginForm from './LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
          <p className="text-slate-500 mt-1">Dr. Saad&apos;s management portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
