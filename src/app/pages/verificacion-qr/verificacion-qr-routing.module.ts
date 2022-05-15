import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificacionQrPage } from './verificacion-qr.page';

const routes: Routes = [
  {
    path: '',
    component: VerificacionQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificacionQrPageRoutingModule {}
