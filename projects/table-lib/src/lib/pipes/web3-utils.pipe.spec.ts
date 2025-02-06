import { Web3UtilsPipe } from './web3-utils.pipe';

describe('Web3UtilsPipe', () => {
  it('create an instance', () => {
    const pipe = new Web3UtilsPipe();
    expect(pipe).toBeTruthy();
  });
});
