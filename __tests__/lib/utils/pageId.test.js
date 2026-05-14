const {
  extractLangPrefix,
  extractLangId,
  getShortId
} = require('@/lib/utils/pageId')

describe('pageId utilities', () => {
  describe('extractLangPrefix', () => {
    it('extracts language prefix before colon', () => {
      expect(extractLangPrefix('en:abc123')).toBe('en')
    })

    it('returns empty string when prefix is not present', () => {
      expect(extractLangPrefix('abc123')).toBe('')
    })
  })

  describe('extractLangId', () => {
    it('extracts id after colon', () => {
      expect(extractLangId('zh:abc123')).toBe('abc123')
    })

    it('supports optional whitespace after colon', () => {
      expect(extractLangId('zh:   abc123')).toBe('abc123')
    })

    it('returns original input when colon is not present', () => {
      expect(extractLangId('abc123')).toBe('abc123')
    })
  })

  describe('getShortId', () => {
    it('returns original value for non-uuid-like inputs', () => {
      expect(getShortId('plain-id')).toBe('plain-id')
      expect(getShortId(undefined)).toBeUndefined()
    })

    it('returns substring from index 14 for uuid-like inputs', () => {
      expect(getShortId('11111111-2222-3333-4444-555555555555')).toBe(
        '3333-4444-555555555555'
      )
    })
  })
})
