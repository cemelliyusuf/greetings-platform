import { CanvasData } from '@/types'
import { initParticles, updateParticles, drawParticles } from './particles'

// Draw static card elements onto a canvas context
export function drawCardFrame(
  ctx: CanvasRenderingContext2D,
  canvasData: CanvasData
) {
  ctx.fillStyle = canvasData.background
  ctx.fillRect(0, 0, canvasData.width, canvasData.height)

  for (const el of canvasData.elements) {
    ctx.save()
    if (el.type === 'rect') {
      ctx.fillStyle = el.fill
      if (el.fill !== 'transparent') {
        if ((el as any).cornerRadius) {
          roundRect(ctx, el.x, el.y, el.width, (el as any).height, (el as any).cornerRadius)
          ctx.fill()
        } else {
          ctx.fillRect(el.x, el.y, el.width, (el as any).height ?? el.width)
        }
      }
      if ((el as any).stroke && (el as any).strokeWidth) {
        ctx.strokeStyle = (el as any).stroke
        ctx.lineWidth = (el as any).strokeWidth
        if ((el as any).cornerRadius) {
          roundRect(ctx, el.x, el.y, el.width, (el as any).height, (el as any).cornerRadius)
          ctx.stroke()
        } else {
          ctx.strokeRect(el.x, el.y, el.width, (el as any).height ?? el.width)
        }
      }
    } else if (el.type === 'circle') {
      const e = el as any
      ctx.beginPath()
      ctx.ellipse(e.x + e.width / 2, e.y + e.height / 2, e.width / 2, e.height / 2, 0, 0, Math.PI * 2)
      ctx.fillStyle = e.fill
      ctx.fill()
      if (e.stroke && e.strokeWidth) {
        ctx.strokeStyle = e.stroke
        ctx.lineWidth = e.strokeWidth
        ctx.stroke()
      }
    } else if (el.type === 'text') {
      const e = el as any
      const bold = e.fontStyle?.includes('bold') ? 'bold ' : ''
      const italic = e.fontStyle?.includes('italic') ? 'italic ' : ''
      ctx.font = `${italic}${bold}${e.fontSize}px ${e.fontFamily}`
      ctx.fillStyle = e.fill
      ctx.textAlign = e.align
      const lines = e.text.split('\n')
      const lh = e.fontSize * 1.3
      const sx = e.align === 'center' ? e.x + e.width / 2 : e.align === 'right' ? e.x + e.width : e.x
      lines.forEach((line: string, i: number) => {
        ctx.fillText(line, sx, e.y + e.fontSize + i * lh, e.width)
      })
    }
    ctx.restore()
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

export async function exportAnimatedGif(
  canvasData: CanvasData,
  onProgress?: (pct: number) => void
): Promise<void> {
  // Lazy load gif.js (browser-only)
  const GIF = (await import('gif.js')).default

  const { width, height, animation } = canvasData
  if (!animation) throw new Error('No animation layer')

  // Scale down for GIF (keeps file size manageable)
  const scale = width > 400 ? 0.6 : 0.8
  const gw = Math.round(width * scale)
  const gh = Math.round(height * scale)

  const offscreen = document.createElement('canvas')
  offscreen.width = gw
  offscreen.height = gh
  const ctx = offscreen.getContext('2d')!

  const fps = 20
  const duration = 3 // seconds
  const totalFrames = fps * duration
  const delay = Math.round(1000 / fps)

  const particles = initParticles(
    animation.type,
    gw, gh,
    animation.colors ?? ['#ffffff'],
    animation.density ?? 45
  )

  const gif = new GIF({
    workers: 2,
    quality: 8,
    width: gw,
    height: gh,
    workerScript: '/gif.worker.js',
    repeat: 0, // loop forever
  })

  // Capture all frames
  for (let i = 0; i < totalFrames; i++) {
    ctx.save()
    ctx.scale(scale, scale)
    drawCardFrame(ctx, canvasData)
    ctx.restore()
    drawParticles(ctx, particles, animation.type)
    updateParticles(particles, animation.type, gw, gh, animation.colors ?? ['#ffffff'])

    gif.addFrame(ctx, { delay, copy: true })
    onProgress?.(Math.round((i / totalFrames) * 80))
  }

  return new Promise((resolve, reject) => {
    gif.on('progress', (p: number) => onProgress?.(80 + Math.round(p * 20)))
    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'card-animated.gif'
      a.click()
      URL.revokeObjectURL(url)
      onProgress?.(100)
      resolve()
    })
    gif.on('error', reject)
    gif.render()
  })
}
