import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaEquipoPageRoutingModule } from './estadistica-equipo-routing.module';

import { EstadisticaEquipoPage } from './estadistica-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaEquipoPageRoutingModule
  ],
  declarations: [EstadisticaEquipoPage]
})
export class EstadisticaEquipoPageModule {}
