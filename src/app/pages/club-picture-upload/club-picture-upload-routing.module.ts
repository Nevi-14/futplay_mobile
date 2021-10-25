import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubPictureUploadPage } from './club-picture-upload.page';

const routes: Routes = [
  {
    path: '',
    component: ClubPictureUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubPictureUploadPageRoutingModule {}
