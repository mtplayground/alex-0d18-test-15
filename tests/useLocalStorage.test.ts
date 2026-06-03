import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useLocalStorage } from '../src/hooks/useLocalStorage'

const TEST_KEY = 'unit:test-storage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
    window.localStorage.clear()
  })

  it('uses the initial value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'fallback'))

    expect(result.current[0]).toBe('fallback')
  })

  it('reads a plain string value from storage', () => {
    window.localStorage.setItem(TEST_KEY, 'first\nsecond')

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'fallback'))

    expect(result.current[0]).toBe('first\nsecond')
  })

  it('reads JSON values from storage', () => {
    const storedValue = { enabled: true, count: 2 }
    window.localStorage.setItem(TEST_KEY, JSON.stringify(storedValue))

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, { enabled: false, count: 0 }),
    )

    expect(result.current[0]).toEqual(storedValue)
  })

  it('falls back when non-string JSON parsing fails', () => {
    const fallbackValue = { items: ['fallback'] }
    window.localStorage.setItem(TEST_KEY, 'not-json')

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, fallbackValue),
    )

    expect(result.current[0]).toEqual(fallbackValue)
  })

  it('writes updates after the debounce delay', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, '', { debounceMs: 200 }),
    )

    act(() => {
      result.current[1]('saved text')
    })

    act(() => {
      vi.advanceTimersByTime(199)
    })
    expect(window.localStorage.getItem(TEST_KEY)).toBeNull()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(window.localStorage.getItem(TEST_KEY)).toBe('saved text')
  })

  it('removes the stored value and resets state', () => {
    vi.useFakeTimers()
    window.localStorage.setItem(TEST_KEY, 'stored')

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, '', { debounceMs: 300 }),
    )

    expect(result.current[0]).toBe('stored')

    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toBe('')
    expect(window.localStorage.getItem(TEST_KEY)).toBeNull()
  })
})
