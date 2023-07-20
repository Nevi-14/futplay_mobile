import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEquiposPageRoutingModule } from './mis-equipos-routing.module';

import { MisEquiposPage } from './mis-equipos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEquiposPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [MisEquiposPage]
})
export class MisEquiposPageModule {}
