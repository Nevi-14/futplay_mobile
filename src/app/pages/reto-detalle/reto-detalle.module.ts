import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetoDetallePageRoutingModule } from './reto-detalle-routing.module';

import { RetoDetallePage } from './reto-detalle.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetoDetallePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RetoDetallePage]
})
export class RetoDetallePageModule {}
