import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';

import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ColonesPipe } from './colones.pipe';
import { ValidacionFormularioPipe } from './validacion-formulario.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    ImageSanitizerPipe,
    ColonesPipe,
    ValidacionFormularioPipe
  
  ],
  exports:[
    FiltroPipe,
    ImageSanitizerPipe,
    DatePipe,
    CurrencyPipe,
    ColonesPipe
  
  ],
  imports: [
    CommonModule
  ],

})
export class PipesModule { }
