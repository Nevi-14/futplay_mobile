import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEquiposPageRoutingModule } from './mis-equipos-routing.module';

import { MisEquiposPage } from './mis-equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEquiposPageRoutingModule
  ],
  declarations: [MisEquiposPage]
})
export class MisEquiposPageModule {}
