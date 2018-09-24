const expect= require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject nonstring values', () => {
    let val = 1235123;
    expect(isRealString(val)).toBe(false);
  });
  it('should reject strings without any characters', () => {
    let val = "     ";
    expect(isRealString(val)).toBe(false);
  });
  it('should allow strings with any characters', () => {
    let val = '53452klhkjfr@#$@$QFGW    ';
    expect(isRealString(val)).toBe(true);
  });
});