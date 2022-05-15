import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReservacionesPageRoutingModule } from './mis-reservaciones-routing.module';

import { MisReservacionesPage } from './mis-reservaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisReservacionesPageRoutingModule
  ],
  declarations: [MisReservacionesPage]
})
export class MisReservacionesPageModule {}
