const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let res = generateMessage('Tilly', 'Tingly');
    expect(res.from).toBe('Tilly');
    expect(res.text).toBe('Tingly');
    expect(res.createdAt).toBeA('number');
  });
});