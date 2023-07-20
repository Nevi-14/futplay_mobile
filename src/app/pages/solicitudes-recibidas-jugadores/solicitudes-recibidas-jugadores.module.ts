import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesRecibidasJugadoresPageRoutingModule } from './solicitudes-recibidas-jugadores-routing.module';

import { SolicitudesRecibidasJugadoresPage } from './solicitudes-recibidas-jugadores.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesRecibidasJugadoresPageRoutingModule,
    TranslateModule
  ],
  declarations: [SolicitudesRecibidasJugadoresPage]
})
export class SolicitudesRecibidasJugadoresPageModule {}
