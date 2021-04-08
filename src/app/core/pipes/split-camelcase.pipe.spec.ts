import { SplitCamelcasePipe } from './split-camelcase.pipe';

describe('SplitCamelcasePipe', () => {
  it('create an instance', () => {
    const pipe = new SplitCamelcasePipe();
    expect(pipe).toBeTruthy();
  });
});
