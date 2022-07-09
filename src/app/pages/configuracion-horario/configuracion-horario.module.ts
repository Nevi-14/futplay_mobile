import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionHorarioPageRoutingModule } from './configuracion-horario-routing.module';

import { ConfiguracionHorarioPage } from './configuracion-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionHorarioPageRoutingModule
  ],
  declarations: [ConfiguracionHorarioPage]
})
export class ConfiguracionHorarioPageModule {}
