import { ThousandPipe } from './thousand.pipe';

describe('ThousandPipe', () => {

  it('create an instance', () => {
    const pipe = new ThousandPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "20000" to "20k"', () => {
    const pipe = new ThousandPipe();
    expect(pipe.transform('20000')).toBe('20k');
  });

  it('transforms "100" to "100"', () => {
    const pipe = new ThousandPipe();
    expect(pipe.transform('100')).toBe('100');
  });

});