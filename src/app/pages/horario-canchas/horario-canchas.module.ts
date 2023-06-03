import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioCanchasPageRoutingModule } from './horario-canchas-routing.module';

import { HorarioCanchasPage } from './horario-canchas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioCanchasPageRoutingModule
  ],
  declarations: [HorarioCanchasPage]
})
export class HorarioCanchasPageModule {}
