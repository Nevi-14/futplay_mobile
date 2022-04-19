import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroEquipoPageRoutingModule } from './filtro-equipo-routing.module';

import { FiltroEquipoPage } from './filtro-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroEquipoPageRoutingModule
  ],
  declarations: [FiltroEquipoPage]
})
export class FiltroEquipoPageModule {}
