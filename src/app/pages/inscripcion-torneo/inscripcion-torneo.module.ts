import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionTorneoPageRoutingModule } from './inscripcion-torneo-routing.module';

import { InscripcionTorneoPage } from './inscripcion-torneo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionTorneoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InscripcionTorneoPage]
})
export class InscripcionTorneoPageModule {}
