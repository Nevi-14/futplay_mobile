import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEquiposPageRoutingModule } from './lista-equipos-routing.module';

import { ListaEquiposPage } from './lista-equipos.page';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEquiposPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [ListaEquiposPage]
})
export class ListaEquiposPageModule {}
