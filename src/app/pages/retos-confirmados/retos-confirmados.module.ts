import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosConfirmadosPageRoutingModule } from './retos-confirmados-routing.module';

import { RetosConfirmadosPage } from './retos-confirmados.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosConfirmadosPageRoutingModule,
    TranslateModule
  ],
  declarations: [RetosConfirmadosPage]
})
export class RetosConfirmadosPageModule {}
