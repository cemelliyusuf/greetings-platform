'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { CanvasData, CanvasElement, TextElement, ShapeElement, ImageElement } from '@/types'
import EditorCanvas from './EditorCanvas'
import EditorToolbar from './EditorToolbar'
import ElementProperties from './ElementProperties'
import { Download, CalendarCheck, Sparkles, Loader2 } from 'lucide-react'
import { preloadImage } from '@/components/gallery/TemplatePreview'
import Link from 'next/link'

interface Props {
  initialData: CanvasData
  templateId?: string
}

export default function CardEditor({ initialData, templateId }: Props) {
  const [canvasData, setCanvasData] = useState<CanvasData>(initialData)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [history, setHistory] = useState<CanvasData[]>([initialData])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [gifProgress, setGifProgress] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selectedElement = canvasData.elements.find(e => e.id === selectedId) ?? null

  const pushHistory = useCallback((data: CanvasData) => {
    setHistory(prev => {
      const truncated = prev.slice(0, historyIndex + 1)
      return [...truncated, data]
    })
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  const updateCanvas = useCallback((data: CanvasData) => {
    setCanvasData(data)
    pushHistory(data)
  }, [pushHistory])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setCanvasData(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setCanvasData(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo(); else undo()
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const tag = (e.target as HTMLElement).tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && selectedId) {
          updateCanvas({ ...canvasData, elements: canvasData.elements.filter(el => el.id !== selectedId) })
          setSelectedId(null)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [undo, redo, selectedId, canvasData, updateCanvas])

  const addText = () => {
    const el: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'Your text here',
      x: 50,
      y: 100,
      width: 400,
      fontSize: 28,
      fontFamily: 'Georgia',
      fill: '#1f2937',
      align: 'center',
    }
    const next = { ...canvasData, elements: [...canvasData.elements, el] }
    updateCanvas(next)
    setSelectedId(el.id)
  }

  const addImage = async (file: File) => {
    const src = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target!.result as string)
      reader.readAsDataURL(file)
    })
    await preloadImage(src)
    const el: ImageElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      src,
      x: 50,
      y: 50,
      width: 400,
      height: 300,
    }
    const next = { ...canvasData, elements: [...canvasData.elements, el] }
    updateCanvas(next)
    setSelectedId(el.id)
  }

  const addShape = (type: 'rect' | 'circle') => {
    const el: ShapeElement = {
      id: `${type}-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: 200,
      height: type === 'circle' ? 200 : 80,
      fill: '#e0e7ff',
      stroke: '#6366f1',
      strokeWidth: 2,
      cornerRadius: type === 'rect' ? 8 : undefined,
    }
    updateCanvas({ ...canvasData, elements: [...canvasData.elements, el] })
    setSelectedId(el.id)
  }

  const updateElement = (updated: CanvasElement) => {
    const next = {
      ...canvasData,
      elements: canvasData.elements.map(el => el.id === updated.id ? updated : el),
    }
    updateCanvas(next)
  }

  const deleteElement = (id: string) => {
    updateCanvas({ ...canvasData, elements: canvasData.elements.filter(el => el.id !== id) })
    setSelectedId(null)
  }

  const moveElement = (id: string, dir: 'up' | 'down') => {
    const els = [...canvasData.elements]
    const idx = els.findIndex(e => e.id === id)
    if (dir === 'up' && idx < els.length - 1) {
      [els[idx], els[idx + 1]] = [els[idx + 1], els[idx]]
    } else if (dir === 'down' && idx > 0) {
      [els[idx], els[idx - 1]] = [els[idx - 1], els[idx]]
    }
    updateCanvas({ ...canvasData, elements: els })
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'card.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadGif = async () => {
    if (!canvasData.animation) return
    setGifProgress(0)
    try {
      const { exportAnimatedGif } = await import('@/lib/gif-export')
      await exportAnimatedGif(canvasData, (pct) => setGifProgress(pct))
    } finally {
      setGifProgress(null)
    }
  }

  const downloadPDF = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { jsPDF } = await import('jspdf')
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: canvasData.width > canvasData.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvasData.width, canvasData.height],
    })
    pdf.addImage(imgData, 'PNG', 0, 0, canvasData.width, canvasData.height)
    pdf.save('card.pdf')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <EditorToolbar
          onAddText={addText}
          onAddShape={addShape}
          onAddImage={addImage}
          onUndo={undo}
          onRedo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          background={canvasData.background}
          onBackgroundChange={bg => updateCanvas({ ...canvasData, background: bg })}
        />
        <div className="flex items-center gap-2">
          <Link
            href={`/rsvp/create${templateId ? `?template=${templateId}` : ''}`}
            className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            Add RSVP
          </Link>
          <button
            onClick={downloadImage}
            className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            PNG
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          {canvasData.animation && (
            <button
              onClick={downloadGif}
              disabled={gifProgress !== null}
              className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-pink-500 to-violet-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {gifProgress !== null
                ? <><Loader2 className="w-4 h-4 animate-spin" />{gifProgress}%</>
                : <><Sparkles className="w-4 h-4" />GIF</>
              }
            </button>
          )}
        </div>
      </div>

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8">
          <EditorCanvas
            canvasData={canvasData}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUpdate={updateElement}
            ref={canvasRef}
          />
        </div>

        {/* Right panel */}
        <div className="w-72 bg-white border-l overflow-y-auto">
          {selectedElement ? (
            <ElementProperties
              element={selectedElement}
              onChange={updateElement}
              onDelete={() => deleteElement(selectedElement.id)}
              onMoveUp={() => moveElement(selectedElement.id, 'up')}
              onMoveDown={() => moveElement(selectedElement.id, 'down')}
            />
          ) : (
            <div className="p-4 text-sm text-gray-400 text-center mt-8">
              Click an element to edit its properties
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
