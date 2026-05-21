'use client'

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { CanvasData, CanvasElement, TextElement, ShapeElement } from '@/types'
import { drawCard } from '@/components/gallery/TemplatePreview'
import { initParticles, updateParticles, drawParticles, Particle } from '@/lib/particles'

interface Props {
  canvasData: CanvasData
  selectedId: string | null
  onSelect: (id: string | null) => void
  onUpdate: (el: CanvasElement) => void
}

interface DragState {
  elementId: string
  startX: number
  startY: number
  origX: number
  origY: number
}

const SCALE = 0.85

const EditorCanvas = forwardRef<HTMLCanvasElement, Props>(function EditorCanvas(
  { canvasData, selectedId, onSelect, onUpdate },
  ref
) {
  const internalRef = useRef<HTMLCanvasElement>(null)
  useImperativeHandle(ref, () => internalRef.current!)

  const drag = useRef<DragState | null>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = internalRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const anim = canvasData.animation

    if (anim) {
      particlesRef.current = initParticles(
        anim.type, canvas.width, canvas.height,
        anim.colors ?? ['#ffffff'], anim.density ?? 40
      )
      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCard(ctx, canvasData)
        // Draw selection on top of card but below particles
        for (const el of canvasData.elements) {
          if (el.id === selectedId) {
            ctx.save(); drawSelection(ctx, el); ctx.restore()
          }
        }
        drawParticles(ctx, particlesRef.current, anim.type)
        updateParticles(particlesRef.current, anim.type, canvas.width, canvas.height, anim.colors ?? ['#ffffff'])
        rafRef.current = requestAnimationFrame(tick)
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0 }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCard(ctx, canvasData)
      for (const el of canvasData.elements) {
        if (el.id === selectedId) {
          ctx.save(); drawSelection(ctx, el); ctx.restore()
        }
      }
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [canvasData, selectedId])

  const hitTest = (x: number, y: number): CanvasElement | null => {
    for (let i = canvasData.elements.length - 1; i >= 0; i--) {
      const el = canvasData.elements[i]
      const elH = el.type === 'text' ? 60 + (el as TextElement).fontSize : (el as ShapeElement).height
      if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + elH) {
        return el
      }
    }
    return null
  }

  const toCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = internalRef.current!.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / SCALE,
      y: (e.clientY - rect.top) / SCALE,
    }
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvasCoords(e)
    const hit = hitTest(x, y)
    onSelect(hit?.id ?? null)
    if (hit) {
      drag.current = { elementId: hit.id, startX: x, startY: y, origX: hit.x, origY: hit.y }
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drag.current) return
    const { x, y } = toCanvasCoords(e)
    const dx = x - drag.current.startX
    const dy = y - drag.current.startY
    const el = canvasData.elements.find(el => el.id === drag.current!.elementId)
    if (!el) return
    onUpdate({ ...el, x: drag.current.origX + dx, y: drag.current.origY + dy })
  }

  const onMouseUp = () => { drag.current = null }

  const onDblClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvasCoords(e)
    const hit = hitTest(x, y)
    if (hit?.type === 'text') {
      const el = hit as TextElement
      const text = window.prompt('Edit text:', el.text)
      if (text !== null) onUpdate({ ...el, text })
    }
  }

  const displayW = canvasData.width * SCALE
  const displayH = canvasData.height * SCALE

  return (
    <div className="shadow-2xl">
      <canvas
        ref={internalRef}
        width={canvasData.width}
        height={canvasData.height}
        style={{ width: displayW, height: displayH, cursor: 'default', display: 'block' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDblClick}
      />
    </div>
  )
})

export default EditorCanvas

function drawSelection(ctx: CanvasRenderingContext2D, el: CanvasElement) {
  const h = el.type === 'text' ? 40 + (el as TextElement).fontSize : (el as ShapeElement).height
  ctx.strokeStyle = '#6366f1'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 3])
  ctx.strokeRect(el.x - 4, el.y - 4, el.width + 8, h + 8)
  ctx.setLineDash([])
  const handles = [
    [el.x - 4, el.y - 4],
    [el.x + el.width / 2, el.y - 4],
    [el.x + el.width + 4, el.y - 4],
    [el.x + el.width + 4, el.y + h / 2],
    [el.x + el.width + 4, el.y + h + 4],
    [el.x + el.width / 2, el.y + h + 4],
    [el.x - 4, el.y + h + 4],
    [el.x - 4, el.y + h / 2],
  ]
  for (const [hx, hy] of handles) {
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 1.5
    ctx.fillRect(hx - 4, hy - 4, 8, 8)
    ctx.strokeRect(hx - 4, hy - 4, 8, 8)
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}
