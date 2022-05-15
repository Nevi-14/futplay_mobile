import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroCanchaPageRoutingModule } from './filtro-cancha-routing.module';

import { FiltroCanchaPage } from './filtro-cancha.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroCanchaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FiltroCanchaPage]
})
export class FiltroCanchaPageModule {}
