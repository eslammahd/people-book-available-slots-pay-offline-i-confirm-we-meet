'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }
    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
