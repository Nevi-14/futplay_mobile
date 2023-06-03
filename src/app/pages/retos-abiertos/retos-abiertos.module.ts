import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosAbiertosPageRoutingModule } from './retos-abiertos-routing.module';

import { RetosAbiertosPage } from './retos-abiertos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosAbiertosPageRoutingModule,
    PipesModule
  ],
  declarations: [RetosAbiertosPage]
})
export class RetosAbiertosPageModule {}
