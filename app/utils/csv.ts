export function toCSV(rows: Record<string, any>[], columns?: string[]) {
  if (!rows || rows.length === 0) return ''
  const first = rows[0] || {}
  const cols = columns && columns.length ? columns : Object.keys(first)
  const header = cols.map(c => `"${c.replace(/"/g, '""')}"`).join(',')
  const lines = rows.map(r => cols.map(c => {
    const v = r[c] == null ? '' : String(r[c])
    return `"${v.replace(/"/g, '""')}"`
  }).join(','))
  return [header, ...lines].join('\n')
}

export function downloadCSV(content: string, filename = 'statement.csv') {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', filename)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
