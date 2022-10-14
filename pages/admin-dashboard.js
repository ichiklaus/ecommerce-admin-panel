import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/context/authContext';

import Form from '../src/components/Form';


export default function AdminDashboard() {
  const { authUser, loading, signOutUser } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <div>
      <button onClick={signOutUser}>Sign out</button>
      <div className='product-registration-panel'>
        <Form />
      </div>
    </div>
  )
}
