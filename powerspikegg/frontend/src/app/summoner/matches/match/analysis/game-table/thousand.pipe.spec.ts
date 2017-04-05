import { ThousandPipe } from './thousand.pipe';

describe('ThousandPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandPipe();
    expect(pipe).toBeTruthy();
  });
});
