import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilUsuarioPageRoutingModule } from './editar-perfil-usuario-routing.module';

import { EditarPerfilUsuarioPage } from './editar-perfil-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilUsuarioPageRoutingModule
  ],
  declarations: [EditarPerfilUsuarioPage]
})
export class EditarPerfilUsuarioPageModule {}
