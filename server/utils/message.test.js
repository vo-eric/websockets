const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let res = generateMessage('Tilly', 'Tingly');
    expect(res.from).toBe('Tilly');
    expect(res.text).toBe('Tingly');
    expect(res.createdAt).toBeA('number');
  });

});
describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    let res = generateLocationMessage('Admin', 40.6647648,-73.9809147);
    expect(res.url).toBe('https://google.com/maps?q=40.6647648,-73.9809147');
    expect(res.createdAt).toBeA('number');
    expect(res.from).toBe('Admin');
  });
});