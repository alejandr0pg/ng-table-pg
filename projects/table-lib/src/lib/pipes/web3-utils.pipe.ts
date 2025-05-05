import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'web3Utils',
  standalone: true
})
export class Web3UtilsPipe implements PipeTransform {
  transform(value: string | number | null, type: string, decimals = 18) {
    if (value == null) {
      return 'NO DATA';
    }

    try {
      switch (type) {
        case 'wallet':
          return this.formatWalletAddress(String(value));
        case 'wei':
          return this.fromWei(String(value), decimals);
        case 'token':
          return this.formatTokenAmount(String(value), decimals);
        default:
          return value;
      }
    } catch (error) {
      return type === 'wei' ? '0.0000' : String(value);
    }
  }

  private formatWalletAddress(address: string): string {
    return address.length >= 10
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : address;
  }

  private fromWei(wei: string, decimals: number): string {
    const value = Number(wei) / Math.pow(10, decimals);
    return isNaN(value) ? '0.0000' : value.toFixed(4);
  }

  private formatTokenAmount(amount: string, decimals: number): string {
    const value = Number(amount);
    if (isNaN(value)) return '0.00';
    
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K';
    }
    return value.toFixed(2); // Changed to always use 2 decimals for consistency
  }
}
