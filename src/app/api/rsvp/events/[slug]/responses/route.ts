import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { rows: events } = await pool.query('SELECT id FROM rsvp_events WHERE slug = $1', [slug])
  if (!events[0]) return NextResponse.json([], { status: 200 })

  const { rows } = await pool.query(
    'SELECT * FROM rsvp_responses WHERE event_id = $1 ORDER BY created_at ASC',
    [events[0].id]
  )
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const body = await req.json()
  const { guest_name, guest_email, guest_count, status, message } = body

  const { rows: events } = await pool.query('SELECT id FROM rsvp_events WHERE slug = $1', [slug])
  if (!events[0]) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  const { rows } = await pool.query(
    `INSERT INTO rsvp_responses (event_id, guest_name, guest_email, guest_count, status, message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [events[0].id, guest_name, guest_email || null, guest_count ?? 1, status, message || null]
  )
  return NextResponse.json(rows[0], { status: 201 })
}
