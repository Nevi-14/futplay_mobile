import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PictureUploadPageRoutingModule } from './picture-upload-routing.module';

import { PictureUploadPage } from './picture-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictureUploadPageRoutingModule
  ],
  declarations: [PictureUploadPage]
})
export class PictureUploadPageModule {}
