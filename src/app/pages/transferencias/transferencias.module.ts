import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciasPageRoutingModule } from './transferencias-routing.module';

import { TransferenciasPage } from './transferencias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransferenciasPage]
})
export class TransferenciasPageModule {}
