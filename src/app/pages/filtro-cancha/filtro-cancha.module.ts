import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroCanchaPageRoutingModule } from './filtro-cancha-routing.module';

import { FiltroCanchaPage } from './filtro-cancha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroCanchaPageRoutingModule
  ],
  declarations: [FiltroCanchaPage]
})
export class FiltroCanchaPageModule {}
