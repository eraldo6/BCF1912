'use client'

import { useState } from 'react'

export function AdminTable({ rows }) {
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  if (!rows || rows.length === 0) {
    return (
      <p style={{ color: 'var(--bone-500)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
        Keine Einträge gefunden.
      </p>
    )
  }

  const columns = Object.keys(rows[0])

  const sorted = sortCol
    ? [...rows].sort((a, b) => {
        const av = a[sortCol]
        const bv = b[sortCol]
        if (av === null) return 1
        if (bv === null) return -1
        const cmp = av < bv ? -1 : av > bv ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
    : rows

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        color: 'var(--bone-300)',
      }}>
        <thead>
          <tr>
            {columns.map(col => {
              const active = sortCol === col
              return (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 16px',
                    borderBottom: '1px solid var(--ink-300)',
                    color: active ? 'var(--bone-200)' : 'var(--bone-500)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {col} {active ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.id ?? i} style={{ borderBottom: '1px solid var(--ink-200)' }}>
              {columns.map((col, j) => (
                <td key={j} style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
                  {row[col] === null
                    ? <span style={{ color: 'var(--bone-600)' }}>null</span>
                    : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
