'use client'

import { CanvasElement, TextElement, ShapeElement, ImageElement } from '@/types'
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface Props {
  element: CanvasElement
  onChange: (el: CanvasElement) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

const FONTS = ['Georgia', 'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS']
const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 96]

export default function ElementProperties({ element, onChange, onDelete, onMoveUp, onMoveDown }: Props) {
  const upd = (patch: Partial<CanvasElement>) => onChange({ ...element, ...patch } as CanvasElement)

  return (
    <div className="p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-gray-700 capitalize">{element.type}</h3>
        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} className="p-1.5 hover:bg-gray-100 rounded" title="Move forward">
            <ChevronUp className="w-4 h-4" />
          </button>
          <button onClick={onMoveDown} className="p-1.5 hover:bg-gray-100 rounded" title="Move backward">
            <ChevronDown className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded text-red-500" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Position & size */}
      <div>
        <Label className="text-xs text-gray-500 mb-2 block">Position & Size</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">X</Label>
            <Input type="number" value={Math.round(element.x)} onChange={e => upd({ x: +e.target.value })} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input type="number" value={Math.round(element.y)} onChange={e => upd({ y: +e.target.value })} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs">Width</Label>
            <Input type="number" value={Math.round(element.width)} onChange={e => upd({ width: +e.target.value })} className="h-8 text-sm" />
          </div>
          {(element.type === 'rect' || element.type === 'circle' || element.type === 'image') && (
            <div>
              <Label className="text-xs">Height</Label>
              <Input type="number" value={Math.round((element as ShapeElement | ImageElement).height)} onChange={e => upd({ height: +e.target.value } as Partial<ShapeElement>)} className="h-8 text-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Text properties */}
      {element.type === 'text' && (
        <>
          <div>
            <Label className="text-xs text-gray-500 mb-2 block">Text</Label>
            <textarea
              value={(element as TextElement).text}
              onChange={e => upd({ text: e.target.value } as Partial<TextElement>)}
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Font</Label>
              <select
                value={(element as TextElement).fontFamily}
                onChange={e => upd({ fontFamily: e.target.value } as Partial<TextElement>)}
                className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-xs">Size</Label>
              <select
                value={(element as TextElement).fontSize}
                onChange={e => upd({ fontSize: +e.target.value } as Partial<TextElement>)}
                className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs mb-2 block">Style</Label>
            <div className="flex gap-2">
              {(['bold', 'italic'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => {
                    const current = (element as TextElement).fontStyle ?? ''
                    const has = current.includes(style)
                    const next = has ? current.replace(style, '').trim() : `${current} ${style}`.trim()
                    upd({ fontStyle: next } as Partial<TextElement>)
                  }}
                  className={`px-3 py-1 rounded text-xs border capitalize transition-colors ${
                    (element as TextElement).fontStyle?.includes(style)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-200 text-gray-600 hover:border-indigo-300'
                  }`}
                >
                  {style === 'bold' ? <strong>B</strong> : <em>I</em>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs mb-2 block">Alignment</Label>
            <div className="flex gap-2">
              {(['left', 'center', 'right'] as const).map(align => (
                <button
                  key={align}
                  onClick={() => upd({ align } as Partial<TextElement>)}
                  className={`flex-1 py-1 rounded text-xs border capitalize transition-colors ${
                    (element as TextElement).align === align
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-200 text-gray-600 hover:border-indigo-300'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs mb-2 block">Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(element as TextElement).fill}
                onChange={e => upd({ fill: e.target.value } as Partial<TextElement>)}
                className="w-10 h-8 rounded border cursor-pointer"
              />
              <Input
                value={(element as TextElement).fill}
                onChange={e => upd({ fill: e.target.value } as Partial<TextElement>)}
                className="h-8 text-sm font-mono"
              />
            </div>
          </div>
        </>
      )}

      {/* Shape properties */}
      {(element.type === 'rect' || element.type === 'circle') && (
        <>
          <div>
            <Label className="text-xs mb-2 block">Fill Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(element as ShapeElement).fill === 'transparent' ? '#ffffff' : (element as ShapeElement).fill}
                onChange={e => upd({ fill: e.target.value } as Partial<ShapeElement>)}
                className="w-10 h-8 rounded border cursor-pointer"
              />
              <Input
                value={(element as ShapeElement).fill}
                onChange={e => upd({ fill: e.target.value } as Partial<ShapeElement>)}
                className="h-8 text-sm font-mono"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-2 block">Stroke</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(element as ShapeElement).stroke ?? '#000000'}
                onChange={e => upd({ stroke: e.target.value } as Partial<ShapeElement>)}
                className="w-10 h-8 rounded border cursor-pointer"
              />
              <div className="flex-1">
                <Label className="text-xs">Width</Label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  value={(element as ShapeElement).strokeWidth ?? 0}
                  onChange={e => upd({ strokeWidth: +e.target.value } as Partial<ShapeElement>)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
