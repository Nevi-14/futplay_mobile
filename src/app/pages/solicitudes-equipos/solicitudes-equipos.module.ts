import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesEquiposPageRoutingModule } from './solicitudes-equipos-routing.module';

import { SolicitudesEquiposPage } from './solicitudes-equipos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesEquiposPageRoutingModule,
    TranslateModule
  ],
  declarations: [SolicitudesEquiposPage]
})
export class SolicitudesEquiposPageModule {}
