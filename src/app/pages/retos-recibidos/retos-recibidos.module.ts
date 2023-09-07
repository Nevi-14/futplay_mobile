import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosRecibidosPageRoutingModule } from './retos-recibidos-routing.module';

import { RetosRecibidosPage } from './retos-recibidos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosRecibidosPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [RetosRecibidosPage]
})
export class RetosRecibidosPageModule {}
