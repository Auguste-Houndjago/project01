'use client'

import useAuth from '@/hooks/useAuth';

const ProfileInfo = () => {
  const { user, signOut, updateUserMetadata, getUserRoles, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  const handleUpdateUsername = async () => {
    await updateUserMetadata({ username: 'NewUsername' });
    alert('Username updated!');
  };

  const roles = getUserRoles();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Your roles: {user?.role}</p>
      <button onClick={handleUpdateUsername}>Update Username</button>
      <button onClick={signOut} className='text-base font-bold mx-2'> Logout</button>
    </div>
  );
};

export default ProfileInfo;