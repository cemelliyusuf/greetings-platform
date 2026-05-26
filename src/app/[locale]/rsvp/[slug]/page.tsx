'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { RsvpEvent, RsvpResponse } from '@/types'
import { Calendar, MapPin, Clock, Users, CheckCircle, XCircle, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type AttendStatus = 'attending' | 'not_attending' | 'maybe'

export default function RsvpEventPage() {
  const { slug } = useParams<{ slug: string }>()
  const t = useTranslations('rsvp.event')
  const [event, setEvent] = useState<RsvpEvent | null>(null)
  const [responses, setResponses] = useState<RsvpResponse[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ guest_name: '', guest_email: '', guest_count: '1', status: 'attending' as AttendStatus, message: '' })

  useEffect(() => {
    fetch(`/api/rsvp/events/${slug}`).then(r => r.ok ? r.json() : null).then(d => { if (d) setEvent(d) })
    fetch(`/api/rsvp/events/${slug}/responses`).then(r => r.json()).then(setResponses)
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/rsvp/events/${slug}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, guest_count: +form.guest_count }),
    })
    const response = await res.json()
    setResponses(prev => [...prev, response])
    setSubmitted(true)
  }

  const statusConfig = {
    attending: { label: t('yes'), icon: CheckCircle, color: 'text-green-600' },
    not_attending: { label: t('no'), icon: XCircle, color: 'text-red-500' },
    maybe: { label: t('maybe'), icon: HelpCircle, color: 'text-yellow-600' },
  }

  const attending = responses.filter(r => r.status === 'attending')
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0)

  if (!event) return <div className="flex items-center justify-center min-h-96 text-gray-500">{t('notFound')}</div>

  const dateStr = new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border border-indigo-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
        {event.description && <p className="text-gray-600 mb-6">{event.description}</p>}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-700"><Calendar className="w-4 h-4 text-indigo-500" />{dateStr}</div>
          {event.event_time && <div className="flex items-center gap-2 text-sm text-gray-700"><Clock className="w-4 h-4 text-indigo-500" />{event.event_time}</div>}
          {event.location && <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin className="w-4 h-4 text-indigo-500" />{event.location}</div>}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>{t('guestsAttending', { count: totalGuests })}</span>
            {event.max_guests && <Badge variant="outline" className="text-xs">{t('max', { count: event.max_guests })}</Badge>}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">{t('hostedBy', { name: event.host_name })}</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('sentTitle')}</h2>
          <p className="text-gray-600">
            {form.status === 'attending' ? t('sentAttending') : form.status === 'not_attending' ? t('sentNo') : t('sentMaybe')}
          </p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-indigo-600 hover:underline">{t('editResponse')}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900">{t('willAttend')}</h2>
          <div className="grid grid-cols-3 gap-3">
            {(Object.entries(statusConfig) as [AttendStatus, typeof statusConfig[AttendStatus]][]).map(([key, cfg]) => {
              const Icon = cfg.icon
              return (
                <button key={key} type="button" onClick={() => setForm(f => ({ ...f, status: key }))}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-medium transition-all ${form.status === key ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`}>
                  <Icon className={`w-5 h-5 ${form.status === key ? 'text-indigo-600' : cfg.color}`} />
                  {cfg.label}
                </button>
              )
            })}
          </div>
          <div><Label>{t('yourName')} *</Label><Input required value={form.guest_name} onChange={e => setForm(f => ({ ...f, guest_name: e.target.value }))} placeholder={t('yourName')} className="mt-1" /></div>
          <div><Label>{t('email')}</Label><Input type="email" value={form.guest_email} onChange={e => setForm(f => ({ ...f, guest_email: e.target.value }))} placeholder="your@email.com" className="mt-1" /></div>
          {form.status === 'attending' && (
            <div><Label>{t('guestCount')}</Label><Input type="number" min={1} max={20} value={form.guest_count} onChange={e => setForm(f => ({ ...f, guest_count: e.target.value }))} className="mt-1 w-24" /></div>
          )}
          <div><Label>{t('message')}</Label><textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder={t('messagePlaceholder')} rows={2} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">{t('send')}</Button>
        </form>
      )}

      {responses.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-4">{t('responses', { count: responses.length })}</h3>
          <div className="space-y-2">
            {responses.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.guest_name}</p>
                  {r.message && <p className="text-xs text-gray-500 mt-0.5">"{r.message}"</p>}
                </div>
                <div className="flex items-center gap-2">
                  {r.status === 'attending' && <span className="text-xs text-gray-500">× {r.guest_count}</span>}
                  <Badge variant={r.status === 'attending' ? 'default' : 'outline'}
                    className={`text-xs ${r.status === 'attending' ? 'bg-green-500' : r.status === 'not_attending' ? 'text-red-500 border-red-200' : 'text-yellow-600 border-yellow-200'}`}>
                    {r.status === 'attending' ? t('attending') : r.status === 'not_attending' ? t('notAttending') : t('maybe')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
