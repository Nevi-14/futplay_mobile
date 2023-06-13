import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosEnviadosPageRoutingModule } from './retos-enviados-routing.module';

import { RetosEnviadosPage } from './retos-enviados.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosEnviadosPageRoutingModule,
    PipesModule
  ],
  declarations: [RetosEnviadosPage]
})
export class RetosEnviadosPageModule {}
