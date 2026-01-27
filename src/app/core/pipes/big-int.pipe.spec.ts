import { BigIntPipe } from '../../pipes/big-int.pipe';

describe('BigIntPipe', () => {
  it('create an instance', () => {
    const pipe = new BigIntPipe();
    expect(pipe).toBeTruthy();
  });
});
