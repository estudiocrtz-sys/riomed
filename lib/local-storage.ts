'use client'

import { useCallback, useSyncExternalStore } from 'react'

export const STORAGE_KEYS = {
  appointments: 'riomed:appointments',
  notifications: 'riomed:notifications',
  patient: 'riomed:patient',
} as const

const localChangeEvent = 'riomed-local-storage-change'

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function getSnapshot(key: string) {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) ?? ''
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  function handleChange() {
    onStoreChange()
  }

  window.addEventListener('storage', handleChange)
  window.addEventListener(localChangeEvent, handleChange)
  return () => {
    window.removeEventListener('storage', handleChange)
    window.removeEventListener(localChangeEvent, handleChange)
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => ''
  )

  const value = snapshot ? readStoredValue(key, fallback) : fallback

  const setValue = useCallback((nextValue: T | ((current: T) => T)) => {
    if (typeof window === 'undefined') return

    const current = readStoredValue(key, fallback)
    const resolved = typeof nextValue === 'function'
      ? (nextValue as (current: T) => T)(current)
      : nextValue

    window.localStorage.setItem(key, JSON.stringify(resolved))
    window.dispatchEvent(new CustomEvent(localChangeEvent, { detail: { key } }))
  }, [fallback, key])

  return [value, setValue] as const
}
