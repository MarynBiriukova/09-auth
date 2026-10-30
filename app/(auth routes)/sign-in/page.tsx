'use client'

import { useState } from 'react'
import { login } from '@/lib/api/clientApi'
import { useAuth } from '@/lib/store/auth-store'
//import { LoginRequest } from '@/lib/types'
import { useRouter } from 'next/navigation'
import css from './SignInPage.module.css'

export interface LoginRequest {
  email: string
  password: string
}

const Login = () => {
  const setAuth = useAuth((state) => state.setAuth)

    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        
        const user = Object.fromEntries(formData) as unknown as LoginRequest
        
        try{
    const res = await login(user)
    setAuth(res)
            router.replace('/')
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Something went wrong')
            }
            }
  }
  return (
    <main className={css.mainContent}>
 <form action={handleSubmit}  className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>
  )
}

export default Login
//export const instant = false;