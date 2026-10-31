import { getMe } from '@/lib/api/serverApi'
import css from './ProfilePage.module.css'
import Image from 'next/image'
//import { headers } from 'next/headers'
//import { connection } from 'next/server'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'



export async function generateMetadata(): Promise<Metadata> {
    //await connection()
    try {
        const user = await getMe()

        if (!user) {
            return {
                title: 'Profile | Loading...',
            }
        }

        return {
            title: `Profile  -  ${user.username}`,
            description: `View profile details for ${user.username} on our platform`,
            openGraph: {
                title: `Profile  -  ${user.username}`,
                description: `View profile details for ${user.username} `,
                images:
                    [
                        {
                            url: user.avatar || '/default-avatar.png',
                            width: 120,
                            height: 120,
                            alt: `${user.username}'s avatar`,
                        },
                    ],
            },
        }
    } catch {
        return {
            title: 'Profile',
            description: 'User profile page.',
        }
    }
}


const ProfileUserData = async () => {
    //await connection(); 
    const user = await getMe()

    return (
        <>
        <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  
        </>
    )
} 

// SSR >>
const Profile = async () => {
    // checkSession > middleware....
   
    return (
    <main className={css.mainContent}>
        <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
                </div>
                <Suspense fallback={<p>Loading user data...</p>}>
                <ProfileUserData />
                </Suspense>
                </div>
     
</main>)
}

export default Profile