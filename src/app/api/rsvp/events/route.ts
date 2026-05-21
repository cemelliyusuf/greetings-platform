import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const body = await req.json()
  const { title, event_date, event_time, location, description, host_name, host_email, max_guests, deadline } = body

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()

  const { data, error } = await supabase
    .from('rsvp_events')
    .insert({ slug, title, event_date, event_time: event_time || null, location: location || null, description: description || null, host_name, host_email, max_guests: max_guests || null, deadline: deadline || null })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
