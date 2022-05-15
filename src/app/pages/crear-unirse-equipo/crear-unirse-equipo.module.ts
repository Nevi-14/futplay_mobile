import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearUnirseEquipoPageRoutingModule } from './crear-unirse-equipo-routing.module';

import { CrearUnirseEquipoPage } from './crear-unirse-equipo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearUnirseEquipoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearUnirseEquipoPage]
})
export class CrearUnirseEquipoPageModule {}
