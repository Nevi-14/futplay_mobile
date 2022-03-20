import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionJugadorPageRoutingModule } from './evaluacion-jugador-routing.module';

import { EvaluacionJugadorPage } from './evaluacion-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionJugadorPageRoutingModule
  ],
  declarations: [EvaluacionJugadorPage]
})
export class EvaluacionJugadorPageModule {}
