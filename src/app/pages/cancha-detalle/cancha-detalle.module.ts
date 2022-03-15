import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchaDetallePageRoutingModule } from './cancha-detalle-routing.module';

import { CanchaDetallePage } from './cancha-detalle.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanchaDetallePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CanchaDetallePage],
  providers: [DatePipe]
})
export class CanchaDetallePageModule {}
