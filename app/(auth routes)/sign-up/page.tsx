'use client'

import { useState } from 'react'
import { register , RegisterRequest} from '@/lib/api/clientApi'
import { useAuth } from '@/lib/store/auth-store'
//import { LoginRequest } from '@/types/user'
import { useRouter } from 'next/navigation'
import css from './SignUpPage.module.css'


/*export interface RegisterRequest {
  email: string
  username: string
  password: string
}*/



const Register = () => {
    const setAuth = useAuth((state) => state.setAuth)
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        
      //const user = Object.fromEntries(formData) as unknown as RegisterRequest
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      //const name = formData.get('name') as string

      const registerData = { email, password }//, name

      console.log(" НА СЕРВЕР:", registerData)
        
        try {
          const res = await register(registerData)
          if (res) setAuth(res)
          router.replace('/profile')
          router.refresh()
            console.log('res', res)
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
  <h1 className={css.formTitle}>Sign up</h1>
          <form action={handleSubmit} className={css.form}>
              
    <div className={css.formGroup}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" name="name" className={css.input} required />
    </div>

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
        Register
      </button>
    </div>

            {error &&  <p className={css.error}>{error}</p>}
  </form>
</main>
  )
}

export default Register