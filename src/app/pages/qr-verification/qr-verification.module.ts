import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrVerificationPageRoutingModule } from './qr-verification-routing.module';

import { QrVerificationPage } from './qr-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrVerificationPageRoutingModule
  ],
  declarations: [QrVerificationPage]
})
export class QrVerificationPageModule {}
