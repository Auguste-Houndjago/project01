'use client';

import { useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserRole } from '@prisma/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur au chargement initial
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Écouter les changements d'état d'authentification
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.subscription;
    };
  }, []);


  const signIn = async (provider: 'github' | 'google') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
    console.log('Redirecting to:', data.url);
  };

  
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  // Inscription avec email, mot de passe et métadonnées utilisateur
  const signUpWithEmail = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (error) throw error;
  };

  // Déconnexion de l'utilisateur
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null); // Réinitialiser l'utilisateur après la déconnexion
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // Rafraîchir les informations de l'utilisateur
  const refreshUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      setUser(session?.user ?? null);
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  // Mise à jour des métadonnées de l'utilisateur (par exemple, username)
  const updateUserMetadata = async (metadata: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: metadata,
      });
      if (error) throw error;
      // Rafraîchir l'utilisateur pour refléter les nouvelles métadonnées
      await refreshUser();
    } catch (err) {
      console.error('Error updating user metadata:', err);
    }
  };


  const getUserRoles = () => {
    return user?.user_metadata?.roles || [];
  };


  

  return {
    user,
    loading,
    signIn,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshUser,
    updateUserMetadata,
    getUserRoles,
  };
}

export default useAuth;



// export function useUserRoles(user: User | null) {
//   const [roles, setRoles] = useState<UserRole>()

//   useEffect(() => {
//     if (!user) return

//     const fetchRoles = async () => {
//       try {
//         const response = await fetch(`/api/getUserRoles?userId=${user.id}`)
//         const data = await response.json()

//         setRoles(data)
//       } catch (error) {
//         console.error('Failed to fetch user roles:', error)
//       }
//     }

//     fetchRoles()
//   }, [user])

//   return roles
// }