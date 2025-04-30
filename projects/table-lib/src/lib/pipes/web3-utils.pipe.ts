import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'web3Utils',
  standalone: true
})
export class Web3UtilsPipe implements PipeTransform {
  constructor() {}

  transform(value: string, type: string, decimals = 18) {
    if (value == null) {
      return 'NO DATA';
    } else if (type == 'wallet') {
      return (
        value.substring(0, 6) +
        '...' +
        value.substring(value.length - 4, value.length)
      );
    } else {
      return 0;
    }
  }
}
