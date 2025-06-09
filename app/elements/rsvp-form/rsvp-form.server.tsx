'use server'

import { serverConfig, weddingCountdownConfig } from '@/app/config/config-app-environment'
import { supabase } from '@/app/config/config-supabase'

export interface POSTRsvpData {
  name: string;
  speech: string;
  isAttend: boolean;
  totalPerson: number | null; 
  expires_at: string
}

export type GETRsvpData = {
  name: string;
  speech: string;
  isAttend: boolean;
  totalPerson: number;
  avatarUrl?: string;
  createdAt: string;
  expiresAt: string;
};

export async function createRsvp(data: POSTRsvpData) {
  const { name, speech, isAttend, totalPerson } = data;
  
  const eventDate = new Date(weddingCountdownConfig.event.date); 
  const expiresAt = new Date(eventDate);
  expiresAt.setDate(expiresAt.getDate() + 90); 


  const { data: result, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .insert([{
      user_id: serverConfig.userId,
      name: name,
      speech: speech,
      is_attend: isAttend,
      total_person: totalPerson,
      expires_at: expiresAt
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

  return data.map(item => ({
    name: item.name,
    speech: item.speech,
    isAttend: item.is_attend,
    totalPerson: item.total_person,
    avatarUrl: item.avatar_url,
    createdAt: item.created_at,
    expiresAt: item.expires_at
  })) as GETRsvpData[];

}

export async function isPersonalMessageLimitHit(): Promise<boolean> {
  const { data, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .select('speech')
    .eq('user_id', serverConfig.userId);

  if (error) {
    console.error('❌ Failed to check personal message limit:', error.message);
    throw new Error('Could not check personal message limit');
  }

  const messageCount = data.filter(row => row.speech && row.speech.trim() !== '').length;

  const limit = Number(serverConfig.personalMessageLimit);

  console.log(`💬 Personal messages: ${messageCount} / Limit: ${limit}`);

  return messageCount >= limit;
}



export async function isHeadcountLimitHit(): Promise<boolean> {
  const { data, error } = await supabase
    .from(serverConfig.rsvpTableName)
    .select('total_person')
    .eq('user_id', serverConfig.userId)
    .eq('is_attend', true); 

  if (error) {
    console.error('❌ Failed to check headcount limit:', error.message);
    throw new Error('Could not check headcount limit');
  }

  const totalCount = data.reduce((sum, row) => {
    return sum + (row.total_person ?? 0);
  }, 0);

  const limit = Number(serverConfig.headcountMessageLimit);

  console.log(`🧍 Headcount total (attending only): ${totalCount} / Limit: ${limit}`);

  return totalCount >= limit;
}



