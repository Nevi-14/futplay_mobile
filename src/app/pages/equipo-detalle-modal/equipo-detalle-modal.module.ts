import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoDetalleModalPageRoutingModule } from './equipo-detalle-modal-routing.module';

import { EquipoDetalleModalPage } from './equipo-detalle-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoDetalleModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [EquipoDetalleModalPage]
})
export class EquipoDetalleModalPageModule {}
