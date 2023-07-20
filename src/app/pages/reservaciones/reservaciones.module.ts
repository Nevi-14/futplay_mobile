import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReservacionesPageRoutingModule } from './reservaciones-routing.module';
import { ReservacionesPage } from './reservaciones.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservacionesPageRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [ReservacionesPage]
})
export class ReservacionesPageModule {}
