import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicCalendar2PageRoutingModule } from './ionic-calendar2-routing.module';

import { IonicCalendar2Page } from './ionic-calendar2.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicCalendar2PageRoutingModule,
    NgCalendarModule,
    PipesModule
  ],
  declarations: [IonicCalendar2Page]
})
export class IonicCalendar2PageModule {}
