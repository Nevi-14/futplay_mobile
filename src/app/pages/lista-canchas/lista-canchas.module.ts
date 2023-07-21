import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCanchasPageRoutingModule } from './lista-canchas-routing.module';

import { ListaCanchasPage } from './lista-canchas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCanchasPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [ListaCanchasPage]
})
export class ListaCanchasPageModule {}
