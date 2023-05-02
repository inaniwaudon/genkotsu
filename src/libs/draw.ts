import GIF from 'gif.js'

import { keiFont } from '@/styles/localFonts'

const fontSize = 230
const descender = 0.88

export const drawerWidth = 1920 / 2
export const drawerHeight = 1080 / 2

export const drawText = (text: string, fills: boolean, strokeStyle: string, context: CanvasRenderingContext2D) => {
  context.fillStyle = '#000'
  context.strokeStyle = strokeStyle
  context.lineWidth = 6
  // `var(--kei-font)` is not worked somehow
  context.font = `${fontSize}px ${keiFont.style.fontFamily}`
  context.textAlign = 'center'

  const drawChar = (x: number, y: number, char: string, deg: number) => {
    const transformY = y + fontSize / 2
    const radian = (deg / 360) * Math.PI * 2
    context.translate(x, transformY)
    context.rotate(radian)
    context.strokeText(char, 0, fontSize * (-0.5 + descender))
    if (fills) {
      context.fillText(char, 0, fontSize * (-0.5 + descender))
    }
    context.rotate(-radian)
    context.translate(-x, -transformY)
  }

  const textWidth = fontSize * 2.2
  const textHeight = fontSize * 2

  const x = (drawerWidth - textWidth) / 2
  const x0 = x + fontSize * 0.5
  const x1 = x + fontSize * (1.5 + 0.2)

  const y = (drawerHeight - textHeight) / 2
  const y0 = y
  const y1 = y + fontSize

  const xList = [x0, x1, x0, x1]
  const yList = [y0, y0, y1, y1]
  const degList = [-10, 8, -14, 4]
  for (let i = 0; i < Math.min(text.length, 4); i++) {
    drawChar(xList[i], yList[i], text[i], degList[i])
  }
}

export const drawGenkotsu = (text: string, width: number, height: number, context: CanvasRenderingContext2D) => {
  // draw background
  const color0 = '#ec826a'
  const color1 = '#bf5677'
  const color2 = '#525abf'
  const gradient = context.createRadialGradient(
    width / 2,
    height / 2,
    drawerHeight / 4,
    width / 2,
    height / 2,
    drawerHeight,
  )
  gradient.addColorStop(0, color0)
  gradient.addColorStop(0.3, color1)
  gradient.addColorStop(1, color2)
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)

  context.fillStyle = '#ff6'
  context.beginPath()

  context.shadowColor = 'rgba(255,255,255,0.4)'
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 60

  const diffX = (width - drawerWidth) / 2
  const diffY = (height - drawerHeight) / 2

  context.translate(diffX, diffY)
  for (let i = 0; i < 6; i++) {
    context.moveTo(drawerWidth / 2, 0)
    const angle = (i - 3) * 0.06 + Math.random() * 0.1
    const from = Math.abs(i - 3) * 60 + Math.random() * 20
    const to = drawerHeight - Math.random() * 80
    const count = 20

    const xList: number[] = []
    const yList: number[] = []

    for (let i = 0; i < count; i++) {
      xList.push(drawerWidth / 2 + angle * 100 * i + Math.random() * 40)
      yList.push(((to - from) / count) * i + Math.random() * 30 + from)
      const x = xList[i] - 10
      const y = yList[i] + 10
      context.lineTo(x, y)
    }
    for (let i = count; i >= 0; i--) {
      const x = xList[i] + 10
      const y = yList[i]
      context.lineTo(x, y)
    }
    context.fill()
  }
  context.translate(-diffX, -diffY)

  context.shadowColor = 'transparent'
  context.shadowBlur = 0

  // draw a base text
  const textCanvas = document.createElement('canvas')
  textCanvas.width = drawerWidth
  textCanvas.height = drawerHeight
  const textContext = textCanvas.getContext('2d')
  if (!textContext) {
    return
  }

  // appearance
  const loops = 100
  for (let i = 0; i < loops; i++) {
    textContext.clearRect(0, 0, drawerWidth, drawerHeight)
    const scale = 1.0 - (1.0 / loops) * i
    const scaledWidth = drawerWidth * scale
    const scaledHeight = drawerHeight * scale
    const t = i / loops
    const l0 = 60 + (1 - Math.pow(1 - t, 3)) * 40
    drawText(text, false, `hsl(0, 100%, ${l0}%)`, textContext)
    context.drawImage(textCanvas, (width - scaledWidth) / 2, (height - scaledHeight) / 2, scaledWidth, scaledHeight)
  }
  context.translate(diffX, diffY)
  drawText(text, true, '#fff', context)
  context.translate(-diffX, -diffY)
}

export const createGif = (text: string) => {
  const canvas = document.createElement('canvas')
  const originalCanvas = document.createElement('canvas')

  const maxWidth = drawerWidth * 2
  const maxHeight = drawerHeight * 2
  canvas.width = drawerWidth
  canvas.height = drawerHeight
  originalCanvas.width = maxWidth
  originalCanvas.height = maxHeight
  const context = canvas.getContext('2d')
  const originalContext = originalCanvas.getContext('2d')

  if (!context || !originalContext) {
    return
  }
  drawGenkotsu(text, maxWidth, maxHeight, originalContext)

  const gif = new GIF({
    workers: 2,
    quality: 10,
  })

  const options: { scale: number; x?: number; y?: number }[] = [
    { scale: 1.0 },
    { scale: 1.0 },
    { scale: 1.0 },
    { scale: 1.0 },
    { scale: 1.1 },
    { scale: 1.2 },
    { scale: 1.4 },
    { scale: 1.6 },
    { scale: 1.2 },
    { scale: 1.2 },
    { scale: 1.6 },
    { scale: 1.6 },
    { scale: 1.2 },
    { scale: 1.2 },
    { scale: 1.6 },
    { scale: 1.6 },
    { scale: 1.2 },
    { scale: 1.2 },
    { scale: 1.6 },
    { scale: 1.6 },
    { scale: 1.3 },
    { scale: 1.3, x: -0.1, y: -0.1 },
    { scale: 1.3, x: -0.1, y: -0.1 },
    { scale: 1.3, x: 0.15, y: 0.1 },
    { scale: 1.3, x: 0.15, y: 0.1 },
    { scale: 1.3, x: -0.1, y: -0.1 },
    { scale: 1.3, x: -0.1, y: -0.1 },
    { scale: 1.3, x: 0.1, y: 0.15 },
    { scale: 1.3, x: 0.1, y: 0.15 },
    { scale: 1.3, x: -0.1, y: 0.1 },
    { scale: 1.3, x: -0.1, y: 0.1 },
    { scale: 1.0 },
    { scale: 1.0 },
    { scale: 1.0 },
    { scale: 1.0 },
  ]
  for (let i = 0; i < options.length; i++) {
    const width = maxWidth * options[i].scale
    const height = maxHeight * options[i].scale
    context.drawImage(
      originalCanvas,
      0,
      0,
      maxWidth,
      maxHeight,
      (drawerWidth - width) / 2 + drawerWidth * (options[i].x ?? 0),
      (drawerHeight - height) / 2 + drawerHeight * (options[i].y ?? 0),
      maxWidth * options[i].scale,
      maxHeight * options[i].scale,
    )
    gif.addFrame(canvas, { delay: 30, copy: true })
  }

  gif.on('finished', (blob: Blob) => {
    window.open(URL.createObjectURL(blob))
  })

  gif.render()
}
