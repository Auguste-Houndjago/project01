'use client'

import useAuth from '@/hooks/useAuth'

export default function Github() {
  const { signIn } = useAuth()

  return (
    <button 
      onClick={() => signIn('github')}
      className="px-4 m-4 mt-2 py-2 border rounded-md hover:bg-gray-100"
    >
      Login with GitHub
    </button>
  )
}