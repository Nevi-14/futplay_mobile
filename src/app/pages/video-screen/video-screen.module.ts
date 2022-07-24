import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoScreenPageRoutingModule } from './video-screen-routing.module';

import { VideoScreenPage } from './video-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoScreenPageRoutingModule
  ],
  declarations: [VideoScreenPage]
})
export class VideoScreenPageModule {}
