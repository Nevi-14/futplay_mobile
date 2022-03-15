import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrVerificationDetailsPage } from './qr-verification-details.page';

const routes: Routes = [
  {
    path: '',
    component: QrVerificationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrVerificationDetailsPageRoutingModule {}
