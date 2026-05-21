import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const supabase = getSupabase()
  const { slug } = await params
  const { data: event } = await supabase.from('rsvp_events').select('id').eq('slug', slug).single()
  if (!event) return NextResponse.json([])
  const eventId = (event as { id: string }).id

  const { data } = await supabase
    .from('rsvp_responses')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true })

  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const supabase = getSupabase()
  const { slug } = await params
  const body = await req.json()

  const { data: event } = await supabase.from('rsvp_events').select('id').eq('slug', slug).single()
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  const eventId = (event as { id: string }).id

  const { data, error } = await supabase
    .from('rsvp_responses')
    .insert({ event_id: eventId, ...body })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
