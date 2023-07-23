import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarReservacionPageRoutingModule } from './generar-reservacion-routing.module';

import { GenerarReservacionPage } from './generar-reservacion.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarReservacionPageRoutingModule,
    PipesModule,
    ComponentsModule,
    MatDatepickerModule
 
  ],
  declarations: [GenerarReservacionPage],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class GenerarReservacionPageModule {}