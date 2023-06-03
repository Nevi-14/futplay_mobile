import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesEnviadasEquiposPageRoutingModule } from './solicitudes-enviadas-equipos-routing.module';

import { SolicitudesEnviadasEquiposPage } from './solicitudes-enviadas-equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesEnviadasEquiposPageRoutingModule
  ],
  declarations: [SolicitudesEnviadasEquiposPage]
})
export class SolicitudesEnviadasEquiposPageModule {}
