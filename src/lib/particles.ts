import { AnimationType } from '@/types'

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  rotation: number
  vr: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function spawn(
  type: AnimationType,
  w: number,
  h: number,
  colors: string[],
  initialY = false
): Particle {
  const base: Particle = {
    x: rand(0, w), y: 0, vx: 0, vy: 0,
    size: 4, color: pick(colors), opacity: 1, rotation: 0, vr: 0,
  }

  switch (type) {
    case 'snowfall':
      return { ...base,
        x: rand(-10, w + 10),
        y: initialY ? rand(0, h) : rand(-20, -5),
        vx: rand(-0.4, 0.4),
        vy: rand(0.6, 1.8),
        size: rand(2, 5),
        color: pick(['#ffffff', '#e0f0ff', '#c8e8ff']),
        opacity: rand(0.5, 1),
      }
    case 'confetti':
      return { ...base,
        x: rand(-10, w + 10),
        y: initialY ? rand(0, h) : rand(-20, -5),
        vx: rand(-1.5, 1.5),
        vy: rand(1.2, 3.5),
        size: rand(5, 11),
        color: pick(colors),
        opacity: rand(0.8, 1),
        rotation: rand(0, Math.PI * 2),
        vr: rand(-0.12, 0.12),
      }
    case 'hearts':
      return { ...base,
        x: rand(20, w - 20),
        y: initialY ? rand(0, h) : h + 10,
        vx: rand(-0.5, 0.5),
        vy: rand(-1.2, -0.5),
        size: rand(12, 24),
        color: pick(colors),
        opacity: rand(0.6, 0.95),
        rotation: rand(-0.3, 0.3),
        vr: rand(-0.02, 0.02),
      }
    case 'sparkles':
      return { ...base,
        x: rand(0, w),
        y: initialY ? rand(0, h) : rand(-10, -5),
        vx: rand(-0.8, 0.8),
        vy: rand(0.3, 1.2),
        size: rand(8, 18),
        color: pick(colors),
        opacity: rand(0.7, 1),
        rotation: rand(0, Math.PI * 2),
        vr: rand(-0.05, 0.05),
      }
    case 'bubbles':
      return { ...base,
        x: rand(20, w - 20),
        y: initialY ? rand(0, h) : h + 10,
        vx: rand(-0.3, 0.3),
        vy: rand(-0.5, -0.2),
        size: rand(8, 22),
        color: pick(colors),
        opacity: rand(0.15, 0.35),
      }
    case 'fireworks':
      return { ...base,
        x: rand(50, w - 50),
        y: initialY ? rand(0, h * 0.6) : rand(h * 0.6, h + 10),
        vx: rand(-2, 2),
        vy: rand(-4, -1),
        size: rand(3, 7),
        color: pick(colors),
        opacity: rand(0.8, 1),
      }
  }
}

export function initParticles(
  type: AnimationType, w: number, h: number,
  colors: string[], density = 40
): Particle[] {
  return Array.from({ length: density }, () => spawn(type, w, h, colors, true))
}

export function updateParticles(
  ps: Particle[], type: AnimationType,
  w: number, h: number, colors: string[]
) {
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i]
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.vr

    // Gentle sinusoidal drift for snowfall
    if (type === 'snowfall') {
      p.vx += Math.sin(p.y * 0.02) * 0.02
    }

    // Fade out hearts/bubbles as they rise
    if (type === 'hearts' || type === 'bubbles') {
      p.opacity -= 0.003
    }

    const dead =
      (type === 'snowfall' || type === 'confetti' || type === 'sparkles') ? p.y > h + 20 :
      (type === 'hearts' || type === 'bubbles') ? (p.y < -30 || p.opacity <= 0) :
      type === 'fireworks' ? p.y < -20 || p.opacity <= 0 :
      false

    if (dead) {
      ps[i] = spawn(type, w, h, colors, false)
    }
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D, ps: Particle[], type: AnimationType
) {
  ctx.save()
  for (const p of ps) {
    if (p.opacity <= 0) continue
    ctx.globalAlpha = Math.max(0, p.opacity)

    if (type === 'snowfall') {
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

    } else if (type === 'confetti') {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      ctx.restore()

    } else if (type === 'hearts') {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      ctx.font = `${p.size}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('♥', 0, 0)
      ctx.restore()

    } else if (type === 'sparkles') {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      ctx.font = `${p.size}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦', 0, 0)
      ctx.restore()

    } else if (type === 'bubbles') {
      ctx.strokeStyle = p.color
      ctx.lineWidth = 1.5
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.globalAlpha = p.opacity * 0.4
      ctx.fill()
      ctx.globalAlpha = p.opacity
      ctx.stroke()

    } else if (type === 'fireworks') {
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.restore()
}
