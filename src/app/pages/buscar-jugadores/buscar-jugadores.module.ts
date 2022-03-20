import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarJugadoresPageRoutingModule } from './buscar-jugadores-routing.module';

import { BuscarJugadoresPage } from './buscar-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarJugadoresPageRoutingModule
  ],
  declarations: [BuscarJugadoresPage]
})
export class BuscarJugadoresPageModule {}
