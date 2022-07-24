import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoScreenPage } from './video-screen.page';

const routes: Routes = [
  {
    path: '',
    component: VideoScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoScreenPageRoutingModule {}
