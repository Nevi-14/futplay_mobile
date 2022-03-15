import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoReservacionPageRoutingModule } from './equipo-reservacion-routing.module';

import { EquipoReservacionPage } from './equipo-reservacion.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoReservacionPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [EquipoReservacionPage],
  providers:[DatePipe]
})
export class EquipoReservacionPageModule {}
