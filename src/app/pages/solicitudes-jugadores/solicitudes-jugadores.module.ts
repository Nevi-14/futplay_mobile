import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesJugadoresPageRoutingModule } from './solicitudes-jugadores-routing.module';

import { SolicitudesJugadoresPage } from './solicitudes-jugadores.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesJugadoresPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [SolicitudesJugadoresPage]
})
export class SolicitudesJugadoresPageModule {}
