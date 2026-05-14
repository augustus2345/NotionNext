import formatDate, { formatDateFmt } from '@/lib/utils/formatDate'

describe('formatDate', () => {
  it('returns empty string when date is missing', () => {
    expect(formatDate(undefined, 'en-US')).toBe('')
  })

  it('returns original date value when locale is missing', () => {
    expect(formatDate('2024-05-20', '')).toBe('2024-05-20')
  })

  it('normalizes zh locale output to dash-separated format', () => {
    const spy = jest
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('2024年5月20日')

    expect(formatDate('2024-05-20', 'zh-CN')).toBe('2024-5-20')
    expect(spy).toHaveBeenCalledWith('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  })

  it('keeps non-zh locale output unchanged', () => {
    jest
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('May 20, 2024')

    expect(formatDate('2024-05-20', 'en-US')).toBe('May 20, 2024')
  })
})

describe('formatDateFmt', () => {
  it('formats common date tokens and quarter token', () => {
    const timestamp = new Date(2024, 4, 20, 3, 4, 5, 6).getTime()
    expect(formatDateFmt(timestamp, 'yyyy-MM-dd hh:mm:ss q S')).toBe(
      '2024-05-20 03:04:05 2 6'
    )
  })

  it('trims the final output', () => {
    const timestamp = new Date(2024, 0, 1).getTime()
    expect(formatDateFmt(timestamp, '  yyyy  ')).toBe('2024')
  })
})
