'use server'

import { serverConfig } from '@/app/config/config-app-environment'
import { supabase } from '@/app/config/config-supabase'

export interface POSTRsvpData {
  name: string;
  speech: string;
  isAttend: boolean;
  totalPerson: number | null; 
}

export type GETRsvpData = {
  name: string;
  speech: string;
  isAttend: boolean;
  totalPerson: number;
  avatarUrl?: string;
  created_at: string;
};

export async function createRsvp(data: POSTRsvpData) {
  const { name, speech, isAttend, totalPerson } = data;

  const { data: result, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .insert([{
      user_id: serverConfig.userId,
      name: name,
      speech: speech,
      is_attend: isAttend,
      total_person: totalPerson
    }])
    .select();

  if (error) {
    console.error('Supabase insert error:', error.message);
    throw new Error('Failed to save RSVP');
  }

  console.log('Insert successful:', result);
  return result;
}


export async function fetchRsvpData(): Promise< GETRsvpData[] > {
  const { data, count, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .select('*', { count: 'exact' })
    .eq('user_id', serverConfig.userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch failed:', error.message);
    throw new Error('Failed to fetch RSVPs by user ID');
  }

  return data as GETRsvpData[] ;
}
