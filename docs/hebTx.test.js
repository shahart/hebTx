const hebTx = require('./hebTx');

describe('hebTx', () => {
  test('sanity', () => {
    expect(hebTx('שיאפלוספלוס')).toBe('ahtpkuxpkux');
  });

  test('empty string', () => {
    expect(hebTx('')).toBe('');
  });

  test('single Hebrew letter', () => {
    expect(hebTx('ש')).toBe('a'); // Adjust expected value as per your mapping
  });

  test('multiple Hebrew letters', () => {
    expect(hebTx('שלום')).toBe('akuo'); // Adjust expected value as per your mapping
  });

  test('mixed Hebrew and English', () => {
    expect(hebTx('abcש')).toBe('abca'); // Adjust expected value as per your mapping
  });

  test('non-Hebrew input (English)', () => {
    expect(hebTx('hello')).toBe('hello');
  });

  test('numbers and symbols', () => {
    expect(hebTx('123!@#')).toBe('123!@#');
  });

  test('null input', () => {
    expect(() => hebTx(null)).toThrow();
  });

  test('undefined input', () => {
    expect(() => hebTx(undefined)).toThrow();
  });
});
