import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEquipoPageRoutingModule } from './crear-equipo-routing.module';

import { CrearEquipoPage } from './crear-equipo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEquipoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearEquipoPage]
})
export class CrearEquipoPageModule {}
