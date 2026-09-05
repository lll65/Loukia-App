// Génère les icônes PNG de l'application (aucune dépendance externe).
// node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = -1
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

// Anti-crénelage : on échantillonne chaque pixel 3x3.
const SS = 3

function insidePoly(px, py, pts) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function roundedRect(px, py, x0, y0, x1, y1, r) {
  const cx = Math.min(Math.max(px, x0 + r), x1 - r)
  const cy = Math.min(Math.max(py, y0 + r), y1 - r)
  return (px - cx) ** 2 + (py - cy) ** 2 <= r * r
}

const PAGE_L = [[0.175, 0.375], [0.5, 0.325], [0.5, 0.715], [0.175, 0.665]]
const PAGE_R = [[0.5, 0.325], [0.825, 0.375], [0.825, 0.665], [0.5, 0.715]]
const LINES = [0.43, 0.50, 0.57]

function shade(px, py) {
  // Fond dégradé violet, coins arrondis
  if (!roundedRect(px, py, 0, 0, 1, 1, 0.225)) return null
  const top = [124, 92, 252]
  const bottom = [167, 139, 250]
  let color = mix(top, bottom, clamp01(py * 0.85 + px * 0.15))

  const onSpine = Math.abs(px - 0.5) < 0.012 && py > 0.33 && py < 0.715
  const inPage = insidePoly(px, py, PAGE_L) || insidePoly(px, py, PAGE_R)

  if (inPage && !onSpine) {
    color = [255, 255, 255]
    // petites lignes de texte
    const side = px < 0.5 ? -1 : 1
    for (const ly of LINES) {
      const tilt = ly === LINES[0] ? 0.018 : ly === LINES[1] ? 0.012 : 0.006
      const y = ly + side * (px - 0.5) * -0.12
      const near = Math.abs(py - y) < 0.016
      const inside = side < 0 ? px > 0.235 && px < 0.455 : px > 0.545 && px < 0.765 - tilt
      if (near && inside) color = [196, 181, 253]
    }
  }
  return color
}

function render(size) {
  const out = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / size
          const py = (y + (sy + 0.5) / SS) / size
          const c = shade(px, py)
          if (c) { r += c[0]; g += c[1]; b += c[2]; a += 255 }
        }
      }
      const n = SS * SS
      const i = (y * size + x) * 4
      out[i] = Math.round(r / n)
      out[i + 1] = Math.round(g / n)
      out[i + 2] = Math.round(b / n)
      out[i + 3] = Math.round(a / n)
    }
  }
  return encodePng(size, size, out)
}

mkdirSync('public/icons', { recursive: true })
for (const size of [180, 192, 512]) {
  writeFileSync(`public/icons/icon-${size}.png`, render(size))
  console.log(`public/icons/icon-${size}.png`)
}
