import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroUbicacionPageRoutingModule } from './filtro-ubicacion-routing.module';

import { FiltroUbicacionPage } from './filtro-ubicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroUbicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FiltroUbicacionPage]
})
export class FiltroUbicacionPageModule {}
