import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitCamelcasePipe } from './split-camelcase.pipe';



@NgModule({
  declarations: [SplitCamelcasePipe],
  imports: [
    CommonModule
  ],
  exports: [SplitCamelcasePipe]
})
export class PipesModule { }
