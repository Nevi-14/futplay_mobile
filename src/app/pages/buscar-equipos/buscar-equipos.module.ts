import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarEquiposPageRoutingModule } from './buscar-equipos-routing.module';

import { BuscarEquiposPage } from './buscar-equipos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarEquiposPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [BuscarEquiposPage]
})
export class BuscarEquiposPageModule {}
