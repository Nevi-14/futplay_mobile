import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionQrPageRoutingModule } from './verificacion-qr-routing.module';

import { VerificacionQrPage } from './verificacion-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionQrPageRoutingModule
  ],
  declarations: [VerificacionQrPage]
})
export class VerificacionQrPageModule {}
