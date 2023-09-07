import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorPerfilImagenesPageRoutingModule } from './gestor-perfil-imagenes-routing.module';

import { GestorPerfilImagenesPage } from './gestor-perfil-imagenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorPerfilImagenesPageRoutingModule
  ],
  declarations: [GestorPerfilImagenesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestorPerfilImagenesPageModule {}
