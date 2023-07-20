import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesRecibidasEquiposPageRoutingModule } from './solicitudes-recibidas-equipos-routing.module';

import { SolicitudesRecibidasEquiposPage } from './solicitudes-recibidas-equipos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesRecibidasEquiposPageRoutingModule,
    TranslateModule
  ],
  declarations: [SolicitudesRecibidasEquiposPage]
})
export class SolicitudesRecibidasEquiposPageModule {}
