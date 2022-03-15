import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrVerificationDetailsPageRoutingModule } from './qr-verification-details-routing.module';

import { QrVerificationDetailsPage } from './qr-verification-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrVerificationDetailsPageRoutingModule
  ],
  declarations: [QrVerificationDetailsPage]
})
export class QrVerificationDetailsPageModule {}
