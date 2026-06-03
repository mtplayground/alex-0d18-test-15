import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type UseLocalStorageOptions<T> = {
  debounceMs?: number
  deserialize?: (rawValue: string, fallbackValue: T) => T
  onError?: (error: unknown) => void
  serialize?: (value: T) => string
}

export type UseLocalStorageReturn<T> = [
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
  removeValue: () => void,
]

const DEFAULT_DEBOUNCE_MS = 250

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function resolveInitialValue<T>(initialValue: T | (() => T)) {
  if (typeof initialValue === 'function') {
    return (initialValue as () => T)()
  }

  return initialValue
}

function defaultSerialize<T>(value: T) {
  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value) ?? ''
}

function defaultDeserialize<T>(rawValue: string, fallbackValue: T) {
  try {
    const parsedValue = JSON.parse(rawValue) as T

    if (typeof fallbackValue === 'string') {
      return typeof parsedValue === 'string' ? parsedValue : (rawValue as T)
    }

    return parsedValue
  } catch {
    return typeof fallbackValue === 'string' ? (rawValue as T) : fallbackValue
  }
}

function reportStorageError(
  error: unknown,
  onError: UseLocalStorageOptions<unknown>['onError'],
) {
  onError?.(error)
}

function readStoredValue<T>(
  key: string,
  initialValue: T | (() => T),
  deserialize: UseLocalStorageOptions<T>['deserialize'],
  onError: UseLocalStorageOptions<T>['onError'],
) {
  const fallbackValue = resolveInitialValue(initialValue)

  try {
    const storage = getLocalStorage()

    if (!storage) {
      return fallbackValue
    }

    const rawValue = storage.getItem(key)

    if (rawValue === null) {
      return fallbackValue
    }

    return deserialize
      ? deserialize(rawValue, fallbackValue)
      : defaultDeserialize(rawValue, fallbackValue)
  } catch (error) {
    reportStorageError(error, onError)
    return fallbackValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> {
  const {
    debounceMs = DEFAULT_DEBOUNCE_MS,
    deserialize,
    onError,
    serialize,
  } = options

  const [value, setValue] = useState<T>(() =>
    readStoredValue(key, initialValue, deserialize, onError),
  )

  useEffect(() => {
    const writeDelay = Math.max(0, debounceMs)
    const timeoutId = window.setTimeout(() => {
      try {
        const storage = getLocalStorage()

        if (!storage) {
          return
        }

        const storedValue = serialize
          ? serialize(value)
          : defaultSerialize(value)

        storage.setItem(key, storedValue)
      } catch (error) {
        reportStorageError(error, onError)
      }
    }, writeDelay)

    return () => window.clearTimeout(timeoutId)
  }, [debounceMs, key, onError, serialize, value])

  const removeValue = useCallback(() => {
    try {
      const storage = getLocalStorage()

      if (storage) {
        storage.removeItem(key)
      }
    } catch (error) {
      reportStorageError(error, onError)
    }

    setValue(resolveInitialValue(initialValue))
  }, [initialValue, key, onError])

  return [value, setValue, removeValue]
}
