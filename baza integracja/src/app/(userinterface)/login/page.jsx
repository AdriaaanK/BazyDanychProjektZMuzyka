'use client'

import { loginUser } from '@/app/actions/auth'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState('')

  async function handleSubmit(formData) {
    const result = await loginUser(formData)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        action={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] space-y-4"
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-zinc-800"
        />

        {error && (
          <div className="text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 p-3 rounded"
        >
          Login
        </button>
      </form>
    </main>
  )
}