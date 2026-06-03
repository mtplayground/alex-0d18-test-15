import { describe, expect, it } from 'vitest'

import { countTodos } from '../src/lib/countTodos'

describe('countTodos', () => {
  it('counts only non-empty lines', () => {
    expect(countTodos('first\n\nsecond\n   \nthird')).toBe(3)
  })

  it('treats whitespace-only input as empty', () => {
    expect(countTodos(' \n\t\n')).toBe(0)
  })

  it('supports common newline styles', () => {
    expect(countTodos('one\r\ntwo\rthree\nfour')).toBe(4)
  })
})
