import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilEquipoPageRoutingModule } from './editar-perfil-equipo-routing.module';

import { EditarPerfilEquipoPage } from './editar-perfil-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilEquipoPageRoutingModule
  ],
  declarations: [EditarPerfilEquipoPage]
})
export class EditarPerfilEquipoPageModule {}
