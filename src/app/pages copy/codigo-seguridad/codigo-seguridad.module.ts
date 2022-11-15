import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoSeguridadPageRoutingModule } from './codigo-seguridad-routing.module';

import { CodigoSeguridadPage } from './codigo-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoSeguridadPageRoutingModule
  ],
  declarations: [CodigoSeguridadPage]
})
export class CodigoSeguridadPageModule {}
