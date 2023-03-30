import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfectuarPagoPageRoutingModule } from './efectuar-pago-routing.module';

import { EfectuarPagoPage } from './efectuar-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EfectuarPagoPageRoutingModule
  ],
  declarations: [EfectuarPagoPage]
})
export class EfectuarPagoPageModule {}
