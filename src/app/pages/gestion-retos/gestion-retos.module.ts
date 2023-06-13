import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionRetosPageRoutingModule } from './gestion-retos-routing.module';

import { GestionRetosPage } from './gestion-retos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionRetosPageRoutingModule
  ],
  declarations: [GestionRetosPage]
})
export class GestionRetosPageModule {}
