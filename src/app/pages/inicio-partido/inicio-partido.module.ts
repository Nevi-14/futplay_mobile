import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPartidoPageRoutingModule } from './inicio-partido-routing.module';

import { InicioPartidoPage } from './inicio-partido.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPartidoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [InicioPartidoPage]
})
export class InicioPartidoPageModule {}
