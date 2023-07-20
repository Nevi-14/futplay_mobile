import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioGeolocalizacionPageRoutingModule } from './usuario-geolocalizacion-routing.module';

import { UsuarioGeolocalizacionPage } from './usuario-geolocalizacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioGeolocalizacionPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [UsuarioGeolocalizacionPage]
})
export class UsuarioGeolocalizacionPageModule {}
