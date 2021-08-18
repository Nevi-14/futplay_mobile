import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateClubPageRoutingModule } from './create-club-routing.module';

import { CreateClubPage } from './create-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateClubPageRoutingModule
  ],
  declarations: [CreateClubPage]
})
export class CreateClubPageModule {}
