import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, event_date, event_time, location, description, host_name, host_email, max_guests, deadline } = body

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()

  const { rows } = await pool.query(
    `INSERT INTO rsvp_events (slug, title, event_date, event_time, location, description, host_name, host_email, max_guests, deadline)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [slug, title, event_date, event_time || null, location || null, description || null, host_name, host_email, max_guests || null, deadline || null]
  )

  return NextResponse.json(rows[0], { status: 201 })
}
