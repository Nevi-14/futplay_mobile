import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialRetosPageRoutingModule } from './historial-retos-routing.module';

import { HistorialRetosPage } from './historial-retos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialRetosPageRoutingModule
  ],
  declarations: [HistorialRetosPage]
})
export class HistorialRetosPageModule {}
