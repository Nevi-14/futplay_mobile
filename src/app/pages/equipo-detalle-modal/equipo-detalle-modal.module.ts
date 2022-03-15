import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoDetalleModalPageRoutingModule } from './equipo-detalle-modal-routing.module';

import { EquipoDetalleModalPage } from './equipo-detalle-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoDetalleModalPageRoutingModule
  ],
  declarations: [EquipoDetalleModalPage]
})
export class EquipoDetalleModalPageModule {}
