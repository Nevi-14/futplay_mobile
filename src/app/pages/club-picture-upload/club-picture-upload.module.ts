import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubPictureUploadPageRoutingModule } from './club-picture-upload-routing.module';

import { ClubPictureUploadPage } from './club-picture-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubPictureUploadPageRoutingModule
  ],
  declarations: [ClubPictureUploadPage]
})
export class ClubPictureUploadPageModule {}
