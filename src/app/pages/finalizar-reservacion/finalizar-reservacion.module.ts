import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarReservacionPageRoutingModule } from './finalizar-reservacion-routing.module';

import { FinalizarReservacionPage } from './finalizar-reservacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarReservacionPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [FinalizarReservacionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinalizarReservacionPageModule {}
