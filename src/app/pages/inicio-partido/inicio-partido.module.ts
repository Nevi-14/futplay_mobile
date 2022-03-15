import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPartidoPageRoutingModule } from './inicio-partido-routing.module';

import { InicioPartidoPage } from './inicio-partido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPartidoPageRoutingModule
  ],
  declarations: [InicioPartidoPage]
})
export class InicioPartidoPageModule {}
