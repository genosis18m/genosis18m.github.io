 'use client'

import { useEffect } from 'react'

const BUBBLE_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f97316']
const SIZE = 56 // cursor size in px

/** Strip near-white pixels from a canvas (chroma-key white bg removal) */
function removeWhiteBg(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const d = ctx.getImageData(0, 0, w, h)
  for (let i = 0; i < d.data.length; i += 4) {
    const r = d.data[i], g = d.data[i + 1], b = d.data[i + 2]
    // any pixel brighter than threshold on all channels → transparent
    if (r > 210 && g > 210 && b > 210) d.data[i + 3] = 0
  }
  ctx.putImageData(d, 0, 0)
}

export default function GauntletCursor() {
  useEffect(() => {
    // Wipe stale nodes
    document.getElementById('gc-root')?.remove()
    document.getElementById('gc-style')?.remove()

    // ── Styles ────────────────────────────────────────────────────
    const style = document.createElement('style')
    style.id = 'gc-style'
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      #gc-root {
        position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 99999;
        will-change: transform;
        margin-left: -8px; margin-top: -4px;
      }
      #gc-root canvas {
        display: block;
        filter: drop-shadow(0 2px 8px rgba(139,92,246,0.45));
      }
      .gc-bubble {
        position: fixed; pointer-events: none;
        z-index: 99998; border-radius: 50%; opacity: 0;
      }
    `
    document.head.appendChild(style)

    // ── Cursor wrapper + canvas ───────────────────────────────────
    const wrap = document.createElement('div')
    wrap.id = 'gc-root'

    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    wrap.appendChild(canvas)
    document.body.appendChild(wrap)

    const ctx = canvas.getContext('2d')!

    // ── Hidden GIF img (drives animation frames) ──────────────────
    // We draw THIS to the canvas each frame so we control timing
    const gif = new Image()
    gif.src = '/gauntlet-2.gif'

    let mx = -400, my = -400, raf = 0
    let snapping = false
    let snapEndTime = 0
    let gifReady = false

    // Draw one frozen frame (idle state)
    const freezeFrame = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(gif, 0, 0, SIZE, SIZE)
      removeWhiteBg(ctx, SIZE, SIZE)
    }

    gif.onload = () => {
      gifReady = true
      freezeFrame()
    }

    // ── Mouse tracking ────────────────────────────────────────────
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ── rAF loop: position + live-draw during snap ────────────────
    const tick = () => {
      wrap.style.transform = `translate(${mx}px, ${my}px)`

      if (snapping && gifReady) {
        const now = performance.now()
        if (now < snapEndTime) {
          // Live-draw GIF frames with white removal → snap animation plays
          ctx.clearRect(0, 0, SIZE, SIZE)
          ctx.drawImage(gif, 0, 0, SIZE, SIZE)
          removeWhiteBg(ctx, SIZE, SIZE)
        } else {
          // Snap done → freeze on first frame again
          snapping = false
          gif.src = '/gauntlet-2.gif' // reset GIF to frame 1
          setTimeout(freezeFrame, 60)  // draw after browser reloads src
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // ── Click → snap + bubbles ────────────────────────────────────
    const onDown = () => {
      if (!gifReady) return

      // Reload GIF src → resets to frame 1 → snap plays from start
      gif.src = ''
      requestAnimationFrame(() => {
        gif.src = '/gauntlet-2.gif'
        snapping = true
        snapEndTime = performance.now() + 900 // play for 900 ms
      })

      // Coloured bubble particles
      for (let i = 0; i < 8; i++) {
        const b = document.createElement('div')
        b.className = 'gc-bubble'
        const color = BUBBLE_COLORS[i % BUBBLE_COLORS.length]
        const sz = 6 + Math.random() * 6
        const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5
        const dist = 28 + Math.random() * 36
        const dx = Math.cos(angle) * dist
        const dy = Math.sin(angle) * dist
        b.style.cssText = `
          width:${sz}px; height:${sz}px;
          background:${color};
          left:${mx}px; top:${my}px;
          box-shadow:0 0 6px 2px ${color};
          transform:translate(-50%,-50%) scale(0)
        `
        document.body.appendChild(b)
        b.animate([
          { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1)`, opacity: 1, offset: 0.4 },
          { transform: `translate(calc(-50% + ${dx * 1.4}px),calc(-50% + ${dy * 1.4}px)) scale(0.3)`, opacity: 0 },
        ], { duration: 550 + Math.random() * 200, easing: 'ease-out', fill: 'forwards' })
          .onfinish = () => b.remove()
      }
    }

    window.addEventListener('mousedown', onDown)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      wrap.remove()
      style.remove()
      document.querySelectorAll('.gc-bubble').forEach(b => b.remove())
    }
  }, [])

  return null
}
