import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesRecibidasEquiposPageRoutingModule } from './solicitudes-recibidas-equipos-routing.module';

import { SolicitudesRecibidasEquiposPage } from './solicitudes-recibidas-equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesRecibidasEquiposPageRoutingModule
  ],
  declarations: [SolicitudesRecibidasEquiposPage]
})
export class SolicitudesRecibidasEquiposPageModule {}
