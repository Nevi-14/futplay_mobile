import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  ],
  imports: [
    CommonModule
  ],

})
export class PipesModule { }
