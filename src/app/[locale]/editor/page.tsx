'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SAMPLE_TEMPLATES } from '@/lib/templates'
import CardEditor from '@/components/editor/CardEditor'

function EditorContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const template = templateId ? SAMPLE_TEMPLATES.find(t => t.id === templateId) : null
  const initialData = template?.canvas_data ?? {
    width: 500, height: 700, background: '#ffffff', elements: [],
  }
  return <CardEditor initialData={initialData} templateId={templateId ?? undefined} />
}

export default function EditorPage() {
  return (
    <Suspense>
      <EditorContent />
    </Suspense>
  )
}
