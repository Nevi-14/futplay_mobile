import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesRechazadasPageRoutingModule } from './solicitudes-rechazadas-routing.module';

import { SolicitudesRechazadasPage } from './solicitudes-rechazadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesRechazadasPageRoutingModule
  ],
  declarations: [SolicitudesRechazadasPage]
})
export class SolicitudesRechazadasPageModule {}
