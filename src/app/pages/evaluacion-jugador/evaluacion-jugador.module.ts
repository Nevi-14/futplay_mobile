import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionJugadorPageRoutingModule } from './evaluacion-jugador-routing.module';

import { EvaluacionJugadorPage } from './evaluacion-jugador.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionJugadorPageRoutingModule,
    TranslateModule
  ],
  declarations: [EvaluacionJugadorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EvaluacionJugadorPageModule {}
