'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SAMPLE_TEMPLATES } from '@/lib/templates'
import CardEditor from '@/components/editor/CardEditor'

function EditorContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const template = SAMPLE_TEMPLATES.find(t => t.id === templateId)

  const initialData = template?.canvas_data ?? {
    width: 500,
    height: 700,
    background: '#ffffff',
    elements: [],
  }

  return <CardEditor initialData={initialData} templateId={templateId ?? undefined} />
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-500">Loading editor…</div>}>
      <EditorContent />
    </Suspense>
  )
}
