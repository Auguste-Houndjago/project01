import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/supabase';

 const handleCallback = async () => {
  console.log('handleCallback called');
  const { data: session, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error);
   
  }
 else {
  console.log('Session:', session);
}

  const user = session?.session?.user; 
  if (!user) {
    console.error('No user found in session.');
    return null;
  }

  const userId = user.id;
  const firstName = user.user_metadata?.first_name || 'DefaultFirstName';
  const lastName = user.user_metadata?.last_name || 'DefaultLastName';

  if (userId) {
    console.log('User ID:', userId);
  
    const { error: insertError } = await supabase.from('Manager').insert({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
    });
  
    if (insertError) {
      console.error('Error inserting manager:', insertError);
    } else {
      console.log('Manager inserted successfully');
    }
  }

  // Vérifie si le manager existe déjà
  const { data: manager, error: fetchError } = await supabase
    .from('Manager')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code === 'PGRST116') {
    // Si aucun manager n'existe, crée un profil
    const { error: insertError } = await supabase.from('Manager').insert({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
    });

    if (insertError) {
      console.error('Error creating manager profile:', insertError);
      return null;
    }
  } else if (fetchError) {
    console.error('Error fetching manager profile:', fetchError);
    return null;
  }

  console.log('Manager profile exists or has been created.');
  return userId;
};


export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
    } else {
      console.log('Session data:', data);
    }
    // creation de manager dans sa table
    await handleCallback();
  }



  // url-> apres Auth
  return NextResponse.redirect(new URL('/', request.url));
}
