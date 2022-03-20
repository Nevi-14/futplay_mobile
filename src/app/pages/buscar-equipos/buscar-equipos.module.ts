import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarEquiposPageRoutingModule } from './buscar-equipos-routing.module';

import { BuscarEquiposPage } from './buscar-equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarEquiposPageRoutingModule
  ],
  declarations: [BuscarEquiposPage]
})
export class BuscarEquiposPageModule {}
