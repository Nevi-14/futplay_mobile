import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoSolicitudPageRoutingModule } from './equipo-solicitud-routing.module';

import { EquipoSolicitudPage } from './equipo-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoSolicitudPageRoutingModule
  ],
  declarations: [EquipoSolicitudPage]
})
export class EquipoSolicitudPageModule {}
