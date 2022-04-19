import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroJugadorPageRoutingModule } from './filtro-jugador-routing.module';

import { FiltroJugadorPage } from './filtro-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroJugadorPageRoutingModule
  ],
  declarations: [FiltroJugadorPage]
})
export class FiltroJugadorPageModule {}
