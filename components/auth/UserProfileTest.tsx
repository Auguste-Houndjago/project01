
'use client'
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

import { useEffect, useState } from 'react';




export default function UserProfileTest() {

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {

        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (error) {
                console.error('Error fetching session: ', error)
                console.log(error, "erreur session fetching")
            } else {
                setSession(data.session)
            }
        }
        fetchSession()
    }, []);



    return (
        <div>
            {session ? (<div>
                <h1>Welcone , {session.user.email} </h1>
                <p>Role: {session.user.role || "No role defined"}</p>
                <h1>{session.user.app_metadata.provider}</h1>
                <h1>{session.user.id}</h1>
            </div>) : (


                <div>
<p> Loading session...</p>
                </div>


            )}
        </div>
    )
}
