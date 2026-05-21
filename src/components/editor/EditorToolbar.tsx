'use client'

import { Type, Square, Circle, Undo2, Redo2, Image as ImageIcon } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  onAddText: () => void
  onAddShape: (type: 'rect' | 'circle') => void
  onAddImage: (file: File) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  background: string
  onBackgroundChange: (color: string) => void
}

export default function EditorToolbar({
  onAddText, onAddShape, onAddImage, onUndo, onRedo, canUndo, canRedo,
  background, onBackgroundChange,
}: Props) {
  const bgRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
        title="Undo (⌘Z)"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
        title="Redo (⌘⇧Z)"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button
        onClick={onAddText}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
        title="Add text"
      >
        <Type className="w-4 h-4" />
        Text
      </button>
      <button
        onClick={() => onAddShape('rect')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
        title="Add rectangle"
      >
        <Square className="w-4 h-4" />
        Shape
      </button>
      <button
        onClick={() => onAddShape('circle')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
        title="Add circle"
      >
        <Circle className="w-4 h-4" />
        Circle
      </button>

      <button
        onClick={() => imgRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
        title="Add photo"
      >
        <ImageIcon className="w-4 h-4" />
        Photo
      </button>
      <input
        ref={imgRef}
        type="file"
        accept="image/*"
        onChange={e => { const f = e.target.files?.[0]; if (f) { onAddImage(f); e.target.value = '' } }}
        className="sr-only"
      />

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button
        onClick={() => bgRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
        title="Background color"
      >
        <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: background }} />
        Background
      </button>
      <input
        ref={bgRef}
        type="color"
        value={background}
        onChange={e => onBackgroundChange(e.target.value)}
        className="sr-only"
      />
    </div>
  )
}
