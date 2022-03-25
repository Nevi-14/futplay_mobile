import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesJugadoresPageRoutingModule } from './solicitudes-jugadores-routing.module';

import { SolicitudesJugadoresPage } from './solicitudes-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesJugadoresPageRoutingModule
  ],
  declarations: [SolicitudesJugadoresPage]
})
export class SolicitudesJugadoresPageModule {}
