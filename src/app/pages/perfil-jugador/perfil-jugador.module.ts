import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilJugadorPageRoutingModule } from './perfil-jugador-routing.module';

import { PerfilJugadorPage } from './perfil-jugador.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilJugadorPageRoutingModule,
    TranslateModule
  ],
  declarations: [PerfilJugadorPage]
})
export class PerfilJugadorPageModule {}
