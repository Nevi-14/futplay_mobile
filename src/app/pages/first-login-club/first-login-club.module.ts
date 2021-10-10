import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstLoginClubPageRoutingModule } from './first-login-club-routing.module';

import { FirstLoginClubPage } from './first-login-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstLoginClubPageRoutingModule
  ],
  declarations: [FirstLoginClubPage]
})
export class FirstLoginClubPageModule {}
