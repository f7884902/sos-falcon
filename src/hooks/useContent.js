import { useCallback, useEffect, useState } from 'react'
import { siteContent } from '../data/siteContent'

const STORAGE_KEY = 'sosfalcon:content-override'

function readOverride() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function deepMerge(base, override) {
  if (!override) return base
  if (Array.isArray(base)) return Array.isArray(override) ? override : base
  if (typeof base === 'object' && base !== null) {
    const result = { ...base }
    for (const key of Object.keys(override)) {
      result[key] = deepMerge(base[key], override[key])
    }
    return result
  }
  return override !== undefined ? override : base
}

// Reads siteContent.js merged with any local edits saved in this browser
// via the /admin panel. Overrides live only in localStorage — they are
// never published to GitHub Pages automatically. See README.
export function useContent() {
  const [override, setOverride] = useState(readOverride)

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setOverride(readOverride())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const content = deepMerge(siteContent, override)

  const saveOverride = useCallback((next) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setOverride(next)
  }, [])

  const clearOverride = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setOverride(null)
  }, [])

  return { content, override, saveOverride, clearOverride }
}
