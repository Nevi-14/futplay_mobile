import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioCachaPageRoutingModule } from './horario-cacha-routing.module';

import { HorarioCachaPage } from './horario-cacha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioCachaPageRoutingModule
  ],
  declarations: [HorarioCachaPage]
})
export class HorarioCachaPageModule {}
