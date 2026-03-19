import { describe, it, expect } from 'vitest'
import { collectTextFromNode, collectTexts } from '../collector'

describe('collectTextFromNode', () => {
  it('collects text from a text node', () => {
    const set = new Set<string>()
    collectTextFromNode({ type: 'TEXT', characters: 'Hello' }, set)
    expect([...set]).toEqual(['Hello'])
  })

  it('collects text from multiple children', () => {
    const set = new Set<string>()
    collectTextFromNode({
      type: 'FRAME',
      children: [
        { type: 'TEXT', characters: 'Hello' },
        { type: 'TEXT', characters: 'World' },
      ],
    }, set)
    expect([...set]).toEqual(['Hello', 'World'])
  })

  it('collects text from nested structures', () => {
    const set = new Set<string>()
    collectTextFromNode({
      type: 'FRAME',
      children: [
        {
          type: 'GROUP',
          children: [
            { type: 'TEXT', characters: 'Nested text' },
          ],
        },
      ],
    }, set)
    expect([...set]).toEqual(['Nested text'])
  })

  it('deduplicates identical texts', () => {
    const set = new Set<string>()
    collectTextFromNode({
      type: 'FRAME',
      children: [
        { type: 'TEXT', characters: 'Duplicate' },
        { type: 'TEXT', characters: 'Duplicate' },
      ],
    }, set)
    expect([...set]).toEqual(['Duplicate'])
  })

  it('ignores non-text leaf nodes', () => {
    const set = new Set<string>()
    collectTextFromNode({ type: 'RECTANGLE' }, set)
    expect([...set]).toEqual([])
  })

  it('handles empty parent nodes', () => {
    const set = new Set<string>()
    collectTextFromNode({ type: 'FRAME', children: [] }, set)
    expect([...set]).toEqual([])
  })

  it('handles deep nesting', () => {
    const set = new Set<string>()
    collectTextFromNode({
      type: 'FRAME',
      children: [
        {
          type: 'GROUP',
          children: [
            {
              type: 'GROUP',
              children: [
                { type: 'TEXT', characters: 'Deep' },
              ],
            },
          ],
        },
      ],
    }, set)
    expect([...set]).toEqual(['Deep'])
  })

  it('handles mixed node types in children', () => {
    const set = new Set<string>()
    collectTextFromNode({
      type: 'FRAME',
      children: [
        { type: 'RECTANGLE' },
        { type: 'TEXT', characters: 'Label' },
        { type: 'ELLIPSE' },
      ],
    }, set)
    expect([...set]).toEqual(['Label'])
  })
})

describe('collectTexts', () => {
  it('joins texts with newlines', () => {
    const result = collectTexts([
      { type: 'TEXT', characters: 'Line 1' },
      { type: 'TEXT', characters: 'Line 2' },
    ])
    expect(result).toBe('Line 1\nLine 2')
  })

  it('returns empty string for empty input', () => {
    expect(collectTexts([])).toBe('')
  })

  it('deduplicates across multiple root nodes', () => {
    const result = collectTexts([
      { type: 'TEXT', characters: 'Same' },
      { type: 'TEXT', characters: 'Same' },
    ])
    expect(result).toBe('Same')
  })

  it('collects from multiple frames', () => {
    const result = collectTexts([
      {
        type: 'FRAME',
        children: [{ type: 'TEXT', characters: 'Frame 1 text' }],
      },
      {
        type: 'FRAME',
        children: [{ type: 'TEXT', characters: 'Frame 2 text' }],
      },
    ])
    expect(result).toBe('Frame 1 text\nFrame 2 text')
  })
})
