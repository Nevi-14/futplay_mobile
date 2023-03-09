import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioCanchaPageRoutingModule } from './calendario-cancha-routing.module';

import { CalendarioCanchaPage } from './calendario-cancha.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioCanchaPageRoutingModule,
    NgCalendarModule,
    PipesModule
  ],
  declarations: [CalendarioCanchaPage]
})
export class CalendarioCanchaPageModule {}
