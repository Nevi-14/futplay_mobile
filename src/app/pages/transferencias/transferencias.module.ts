import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciasPageRoutingModule } from './transferencias-routing.module';

import { TransferenciasPage } from './transferencias.page';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciasPageRoutingModule,
    PipesModule
  ],
  declarations: [TransferenciasPage]
})
export class TransferenciasPageModule {}
