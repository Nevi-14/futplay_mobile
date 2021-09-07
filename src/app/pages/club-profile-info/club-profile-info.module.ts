import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubProfileInfoPageRoutingModule } from './club-profile-info-routing.module';

import { ClubProfileInfoPage } from './club-profile-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubProfileInfoPageRoutingModule
  ],
  declarations: [ClubProfileInfoPage]
})
export class ClubProfileInfoPageModule {}
