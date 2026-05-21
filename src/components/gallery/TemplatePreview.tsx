'use client'

import { useEffect, useRef } from 'react'
import { Template, CanvasElement, TextElement, ShapeElement, ImageElement } from '@/types'
import { initParticles, updateParticles, drawParticles, Particle } from '@/lib/particles'

const imageCache = new Map<string, HTMLImageElement>()

export function preloadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) return Promise.resolve(imageCache.get(src)!)
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => { imageCache.set(src, img); resolve(img) }
    img.onerror = reject
    img.src = src
  })
}

interface Props {
  template: Template
  fill?: boolean
  width?: number
  height?: number
}

export default function TemplatePreview({ template, fill, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const { canvas_data } = template
  const anim = canvas_data.animation

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const scaleX = w / canvas_data.width
    const scaleY = h / canvas_data.height

    if (anim) {
      particlesRef.current = initParticles(
        anim.type, w, h,
        anim.colors ?? ['#ffffff'],
        anim.density ?? 40
      )

      const tick = () => {
        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.scale(scaleX, scaleY)
        drawCard(ctx, canvas_data)
        ctx.restore()
        drawParticles(ctx, particlesRef.current, anim.type)
        updateParticles(particlesRef.current, anim.type, w, h, anim.colors ?? ['#ffffff'])
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    } else {
      ctx.save()
      ctx.scale(scaleX, scaleY)
      drawCard(ctx, canvas_data)
      ctx.restore()
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [canvas_data, anim])

  const w = fill ? canvas_data.width : (width ?? canvas_data.width)
  const h = fill ? canvas_data.height : (height ?? canvas_data.height)

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      style={fill
        ? { width: '100%', height: '100%', display: 'block' }
        : { width: w, height: h, display: 'block' }
      }
    />
  )
}

export function drawCard(ctx: CanvasRenderingContext2D, canvas_data: { width: number; height: number; background: string; elements: CanvasElement[] }) {
  ctx.fillStyle = canvas_data.background
  ctx.fillRect(0, 0, canvas_data.width, canvas_data.height)
  for (const el of canvas_data.elements) {
    ctx.save()
    drawElement(ctx, el)
    ctx.restore()
  }
}

function drawElement(ctx: CanvasRenderingContext2D, el: CanvasElement) {
  if (el.type === 'rect') {
    const e = el as ShapeElement
    if (e.fill !== 'transparent') {
      ctx.fillStyle = e.fill
      if (e.cornerRadius) {
        roundRect(ctx, e.x, e.y, e.width, e.height, e.cornerRadius)
        ctx.fill()
      } else {
        ctx.fillRect(e.x, e.y, e.width, e.height)
      }
    }
    if (e.stroke && e.strokeWidth) {
      ctx.strokeStyle = e.stroke
      ctx.lineWidth = e.strokeWidth
      if (e.cornerRadius) {
        roundRect(ctx, e.x, e.y, e.width, e.height, e.cornerRadius)
        ctx.stroke()
      } else {
        ctx.strokeRect(e.x, e.y, e.width, e.height)
      }
    }
  } else if (el.type === 'circle') {
    const e = el as ShapeElement
    ctx.beginPath()
    ctx.ellipse(e.x + e.width / 2, e.y + e.height / 2, e.width / 2, e.height / 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = e.fill
    if (e.fill !== 'transparent') ctx.fill()
    if (e.stroke && e.strokeWidth) {
      ctx.strokeStyle = e.stroke
      ctx.lineWidth = e.strokeWidth
      ctx.stroke()
    }
  } else if (el.type === 'text') {
    const e = el as TextElement
    const bold = e.fontStyle?.includes('bold') ? 'bold ' : ''
    const italic = e.fontStyle?.includes('italic') ? 'italic ' : ''
    ctx.font = `${italic}${bold}${e.fontSize}px ${e.fontFamily}`
    ctx.fillStyle = e.fill
    ctx.textAlign = e.align as CanvasTextAlign
    const lines = e.text.split('\n')
    const lh = e.fontSize * 1.3
    const sx = e.align === 'center' ? e.x + e.width / 2 : e.align === 'right' ? e.x + e.width : e.x
    lines.forEach((line, i) => ctx.fillText(line, sx, e.y + e.fontSize + i * lh, e.width))
  } else if (el.type === 'image') {
    const e = el as ImageElement
    const img = imageCache.get(e.src)
    if (img) {
      ctx.drawImage(img, e.x, e.y, e.width, e.height)
    } else {
      preloadImage(e.src).catch(() => {})
      ctx.fillStyle = '#e5e7eb'
      ctx.fillRect(e.x, e.y, e.width, e.height)
      ctx.fillStyle = '#9ca3af'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Loading...', e.x + e.width / 2, e.y + e.height / 2)
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}
