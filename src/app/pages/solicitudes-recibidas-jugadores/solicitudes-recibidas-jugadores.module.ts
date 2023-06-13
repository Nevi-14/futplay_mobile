import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesRecibidasJugadoresPageRoutingModule } from './solicitudes-recibidas-jugadores-routing.module';

import { SolicitudesRecibidasJugadoresPage } from './solicitudes-recibidas-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesRecibidasJugadoresPageRoutingModule
  ],
  declarations: [SolicitudesRecibidasJugadoresPage]
})
export class SolicitudesRecibidasJugadoresPageModule {}
