"use client"

import { useState } from "react"//, useEffect
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/store/authStore"
import { updateMe } from "@/lib/api/clientApi"//, type UpdateProfileRequest 
import css from './EditProfilePage.module.css'
import Image from "next/image"

const EditProfile = () => {
    const router = useRouter()

    /*const { user, setAuth } = useAuth((state) => ({
        user: state.user,
        setAuth: state.setAuth
    }))*/

    const user = useAuth((state) => state.user)
const setAuth = useAuth((state) => state.setAuth)

    const [error , setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [typedUsername, setTypedUsername] = useState<string | null>(null)
    
    //const [mounted, setMounted] = useState(false)

    /*const [formData, setFormData] = useState<UpdateProfileRequest>({
        username: user?.username || '',
email: user?.email ||  '',
    })*/
    if (!user) {
        return <p>Loading...</p>
    }

    const usernameValue = typedUsername !== null ? typedUsername : user.username

  /*  useEffect(() => {
        if (user?.username) {
            setUsername(user.username)
    }
    }, [user?.username])*/


   /* const [prevUser, setPrevUser] = useState(user)

    if (user !== prevUser) {
        setPrevUser(user)
        setFormData({
            username: user?.username || '',
            email : user?.email || '',
        })
    }*/
    
   /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData (( prev ) => ({...prev, [name]: value}))
    }*/

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //if(!user) return
        setError(null)
        setIsLoading(true)

        try {
            //Відправляємо PATCH/PUT запит на сервер
            const updatedUser = await updateMe({
                username: usernameValue,
                email: user.email
            })
            //Віднов Zustand cтор
            setAuth(updatedUser)
            //чистимо локальний стейт форми
            setTypedUsername(null)

            //Вертаємось на сторінку profile
            router.push('/profile')
            router.refresh()
        } catch (err) {
            if (err instanceof Error){
                setError(err.message)
                console.error(error);
            } else {
                setError('Something went wrong while updating profile')
            }
        } finally {
            setIsLoading(false)
       }
    }

    //if (!user) {return <p>Loading...</p>}

    return (
       <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || "/default-avatar.png"}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

                <form onSubmit={ handleSubmit } className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
                            type="text"
                            name="username"
                            value={usernameValue}
                            onChange={(e) => setTypedUsername(e.target.value)}
                            className={css.input}
                            required
                            disabled={isLoading}
                            
        />
      </div>

      <p>Email: {user.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} disabled={isLoading}>
          Save
        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
          Cancel
        </button>
                    </div>
                   
    </form>
  </div>
</main>  
    )
}

export default EditProfile