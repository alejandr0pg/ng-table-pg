import { Web3UtilsPipe } from './web3-utils.pipe';

describe('Web3UtilsPipe', () => {
  let pipe: Web3UtilsPipe;

  beforeEach(() => {
    pipe = new Web3UtilsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('wallet address formatting', () => {
    it('should format wallet address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(pipe.transform(address, 'wallet')).toBe('0x1234...5678');
    });

    it('should handle short addresses', () => {
      expect(pipe.transform('0x1234', 'wallet')).toBe('0x1234');
    });
  });

  describe('wei conversion', () => {
    it('should convert wei to ether', () => {
      expect(pipe.transform('1000000000000000000', 'wei')).toBe('1.0000');
      expect(pipe.transform('500000000000000000', 'wei')).toBe('0.5000');
    });

    it('should handle custom decimals', () => {
      expect(pipe.transform('1000000', 'wei', 6)).toBe('1.0000');
    });
  });

  describe('token amount formatting', () => {
    it('should format millions', () => {
      expect(pipe.transform('1500000', 'token')).toBe('1.50M');
    });

    it('should format thousands', () => {
      expect(pipe.transform('1500', 'token')).toBe('1.50K');
    });

    it('should format small amounts', () => {
      expect(pipe.transform('150', 'token')).toBe('150.00');
    });
  });

  describe('error handling', () => {
    it('should handle null values', () => {
      expect(pipe.transform(null, 'wallet')).toBe('NO DATA');
    });

    it('should handle invalid numbers', () => {
      expect(pipe.transform('not a number', 'wei')).toBe('0.0000');
    });
  });
});
