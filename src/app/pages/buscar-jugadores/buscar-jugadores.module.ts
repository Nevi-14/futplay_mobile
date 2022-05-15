import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarJugadoresPageRoutingModule } from './buscar-jugadores-routing.module';

import { BuscarJugadoresPage } from './buscar-jugadores.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarJugadoresPageRoutingModule,
    PipesModule
  ],
  declarations: [BuscarJugadoresPage]
})
export class BuscarJugadoresPageModule {}
