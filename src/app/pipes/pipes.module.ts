import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';

import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    ImageSanitizerPipe,
  
  ],
  exports:[
    FiltroPipe,
    ImageSanitizerPipe,
    DatePipe,
    CurrencyPipe
  
  ],
  imports: [
    CommonModule
  ],

})
export class PipesModule { }
