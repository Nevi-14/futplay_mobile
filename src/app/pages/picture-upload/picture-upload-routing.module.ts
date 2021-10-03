import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureUploadPage } from './picture-upload.page';

const routes: Routes = [
  {
    path: '',
    component: PictureUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictureUploadPageRoutingModule {}
