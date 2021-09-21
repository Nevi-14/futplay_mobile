import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinClubPageRoutingModule } from './join-club-routing.module';

import { JoinClubPage } from './join-club.page';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinClubPageRoutingModule
  ],
  declarations: [JoinClubPage,FiltroPipe]
})
export class JoinClubPageModule {}
