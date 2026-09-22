'use client'

export function ObfuscatedEmail({ u, d, t, style, className }) {
  const address = `${u}@${d}.${t}`
  return (
    <a href={`mailto:${address}`} style={style} className={className}>
      {address}
    </a>
  )
}
