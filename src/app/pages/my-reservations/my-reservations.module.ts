import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservationsPageRoutingModule } from './my-reservations-routing.module';

import { MyReservationsPage } from './my-reservations.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReservationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyReservationsPage],
  providers: [DatePipe]
})
export class MyReservationsPageModule {}
