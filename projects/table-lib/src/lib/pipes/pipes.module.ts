import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3UtilsPipe } from './web3-utils.pipe';

@NgModule({
  exports: [Web3UtilsPipe],
  imports: [CommonModule, Web3UtilsPipe],
})
export class PipesModule {}
