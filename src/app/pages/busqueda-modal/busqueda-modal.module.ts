import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaModalPageRoutingModule } from './busqueda-modal-routing.module';

import { BusquedaModalPage } from './busqueda-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaModalPageRoutingModule
  ],
  declarations: [BusquedaModalPage]
})
export class BusquedaModalPageModule {}
