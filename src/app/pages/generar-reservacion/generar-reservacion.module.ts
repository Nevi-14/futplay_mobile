import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarReservacionPageRoutingModule } from './generar-reservacion-routing.module';

import { GenerarReservacionPage } from './generar-reservacion.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarReservacionPageRoutingModule,
    PipesModule
  ],
  declarations: [GenerarReservacionPage]
})
export class GenerarReservacionPageModule {}
