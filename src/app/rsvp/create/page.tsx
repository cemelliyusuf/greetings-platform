'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalendarCheck, ArrowRight } from 'lucide-react'

export default function CreateRsvpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    event_date: '',
    event_time: '',
    location: '',
    description: '',
    host_name: '',
    host_email: '',
    max_guests: '',
    deadline: '',
  })

  const upd = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/rsvp/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const event = await res.json()
    router.push(`/rsvp/${event.slug}`)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <CalendarCheck className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create RSVP Event</h1>
          <p className="text-sm text-gray-500">Collect responses from your guests</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Event Title *</Label>
          <Input
            required
            value={form.title}
            onChange={e => upd('title', e.target.value)}
            placeholder="Sarah's 30th Birthday Party"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date *</Label>
            <Input
              required
              type="date"
              value={form.event_date}
              onChange={e => upd('event_date', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              value={form.event_time}
              onChange={e => upd('event_time', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={form.location}
            onChange={e => upd('location', e.target.value)}
            placeholder="123 Main Street, Amsterdam"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            value={form.description}
            onChange={e => upd('description', e.target.value)}
            placeholder="Tell your guests more about the event…"
            rows={3}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Your Name *</Label>
            <Input
              required
              value={form.host_name}
              onChange={e => upd('host_name', e.target.value)}
              placeholder="Host name"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Your Email *</Label>
            <Input
              required
              type="email"
              value={form.host_email}
              onChange={e => upd('host_email', e.target.value)}
              placeholder="you@example.com"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Max Guests</Label>
            <Input
              type="number"
              min={1}
              value={form.max_guests}
              onChange={e => upd('max_guests', e.target.value)}
              placeholder="No limit"
              className="mt-1"
            />
          </div>
          <div>
            <Label>RSVP Deadline</Label>
            <Input
              type="date"
              value={form.deadline}
              onChange={e => upd('deadline', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
          Create Event Page
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  )
}
