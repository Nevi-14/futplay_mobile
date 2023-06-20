import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorContrasenaPageRoutingModule } from './gestor-contrasena-routing.module';

import { GestorContrasenaPage } from './gestor-contrasena.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorContrasenaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GestorContrasenaPage]
})
export class GestorContrasenaPageModule {}
