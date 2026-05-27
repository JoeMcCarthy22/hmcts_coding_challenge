const formatStatus = require('../utils/formatStatus')

describe('formatStatus', () => {
  test('should convert status to uppercase', () => {
    expect(formatStatus('todo')).toBe('TODO')
  })

  test('should convert done to uppercase', () => {
    expect(formatStatus('done')).toBe('DONE')
  })
})