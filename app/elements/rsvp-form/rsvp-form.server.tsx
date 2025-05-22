// app/elements/rsvp-form/rsvp-form.server.ts
'use server'

import { serverConfig } from '@/app/config/config-app-environment'
import { supabase } from '@/app/config/config-supabase'

export async function createRsvp(formData: FormData) {
  const name = formData.get('name')?.toString() || ''
  const speech = formData.get('speech')?.toString() || ''
  const isAttend = formData.get('isAttend') === 'on'
  const totalPerson = parseInt(formData.get('total_person')?.toString() || '0', 10)

  
  const { data, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .insert([{ name, speech, isAttend, total_person: totalPerson }])
    .select()

  if (error) {
    console.error('Supabase insert error:', error.message)
    throw new Error('Failed to save RSVP')
  }

  console.log('Insert successful:', data)
}


export async function fetchRsvpData() {
  const { data, count, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .select('*', { count: 'exact' }) // Include row count
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch failed:', error.message);
    throw new Error('Failed to fetch RSVPs');
  }

  return { data };
}
