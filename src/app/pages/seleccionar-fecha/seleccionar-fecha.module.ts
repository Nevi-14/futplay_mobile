import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarFechaPageRoutingModule } from './seleccionar-fecha-routing.module';

import { SeleccionarFechaPage } from './seleccionar-fecha.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarFechaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeleccionarFechaPage]
})
export class SeleccionarFechaPageModule {}
