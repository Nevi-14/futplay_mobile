import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialRetosPageRoutingModule } from './historial-retos-routing.module';

import { HistorialRetosPage } from './historial-retos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialRetosPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [HistorialRetosPage]
})
export class HistorialRetosPageModule {}
