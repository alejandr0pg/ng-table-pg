import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3UtilsPipe } from './web3-utils.pipe';

@NgModule({
  imports: [CommonModule, Web3UtilsPipe],
  exports: [Web3UtilsPipe],
})
export class PipesModule {}
