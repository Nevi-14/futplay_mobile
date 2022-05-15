import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroJugadorPageRoutingModule } from './filtro-jugador-routing.module';

import { FiltroJugadorPage } from './filtro-jugador.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroJugadorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FiltroJugadorPage]
})
export class FiltroJugadorPageModule {}
