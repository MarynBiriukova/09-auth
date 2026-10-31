'use client'
import { logout } from '@/lib/api/clientApi'
import { useAuth } from '../../lib/store/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import css from '../AuthNavigation/AuthNavigation.module.css'

const AuthNavigation = () => {
  //const { isAuth, user, clearAuth } = useAuth()
  const isAuth = useAuth((state) => state.isAuth)
  const user = useAuth((state) => state.user)
  const clearAuth = useAuth((state) => state.clearAuth) 

  const router = useRouter()

  const handleClick = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally{
    clearAuth()
      router.replace('/sign-in')
    }
  }

    return isAuth ? (
        <>
  <li className={css.navigationItem}>
  <Link href="/profile" prefetch={true} className={css.navigationLink}>
    Profile
  </Link>
</li>

<li className={css.navigationItem}>
  <p className={css.userEmail}>{user?.email}</p>
          <button onClick={handleClick } className={css.logoutButton}>
    Logout
  </button>
        </li>
        </>
    ) : (
<>
<li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={true} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={true} className={css.navigationLink}>
    Sign up
  </Link>
            </li>
            </>
    );

}

export default AuthNavigation