import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionRetosPageRoutingModule } from './gestion-retos-routing.module';

import { GestionRetosPage } from './gestion-retos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionRetosPageRoutingModule,
    TranslateModule
  ],
  declarations: [GestionRetosPage]
})
export class GestionRetosPageModule {}
