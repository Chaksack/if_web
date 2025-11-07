export type ThemeColor = 'default' | 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal' | 'yellow' | 'rose' | 'violet'
export type ThemeType = 'default' | 'mono' | 'scaled'

export const THEME_COLORS = [
  { name: 'default' as ThemeColor, value: 'oklch(0.205 0 0)' },
  { name: 'blue' as ThemeColor, value: 'oklch(0.623 0.214 259.815)' },
  { name: 'green' as ThemeColor, value: 'oklch(0.723 0.219 149.579)' },
  { name: 'red' as ThemeColor, value: 'oklch(0.637 0.237 25.331)' },
  { name: 'rose' as ThemeColor, value: 'oklch(0.645 0.246 16.439)' },
  { name: 'violet' as ThemeColor, value: 'oklch(0.606 0.25 292.717)' },
  { name: 'orange' as ThemeColor, value: 'oklch(0.705 0.213 47.604)' },
  { name: 'yellow' as ThemeColor, value: 'oklch(0.831 0.199 94.952)' },
  { name: 'teal' as ThemeColor, value: 'oklch(0.699 0.151 180.774)' },
  { name: 'purple' as ThemeColor, value: 'oklch(0.553 0.241 305.406)' },
]

export const THEME_TYPE: ThemeType[] = ['default', 'mono', 'scaled']
