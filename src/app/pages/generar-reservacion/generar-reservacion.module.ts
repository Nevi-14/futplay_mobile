import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarReservacionPageRoutingModule } from './generar-reservacion-routing.module';

import { GenerarReservacionPage } from './generar-reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarReservacionPageRoutingModule
  ],
  declarations: [GenerarReservacionPage]
})
export class GenerarReservacionPageModule {}
