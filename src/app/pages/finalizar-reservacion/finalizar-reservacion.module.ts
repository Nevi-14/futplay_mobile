import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarReservacionPageRoutingModule } from './finalizar-reservacion-routing.module';

import { FinalizarReservacionPage } from './finalizar-reservacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarReservacionPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [FinalizarReservacionPage]
})
export class FinalizarReservacionPageModule {}
