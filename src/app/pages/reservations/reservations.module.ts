import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';
import { ComponentsModule } from '../../components/components.module';
import {NgCalendarModule} from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsPageRoutingModule,
    ComponentsModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
