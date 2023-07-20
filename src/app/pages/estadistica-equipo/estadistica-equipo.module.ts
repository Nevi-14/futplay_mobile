import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaEquipoPageRoutingModule } from './estadistica-equipo-routing.module';

import { EstadisticaEquipoPage } from './estadistica-equipo.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaEquipoPageRoutingModule,
    TranslateModule
  ],
  declarations: [EstadisticaEquipoPage]
})
export class EstadisticaEquipoPageModule {}
