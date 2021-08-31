import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubInfoPageRoutingModule } from './club-info-routing.module';

import { ClubInfoPage } from './club-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubInfoPageRoutingModule
  ],
  declarations: [ClubInfoPage]
})
export class ClubInfoPageModule {}
