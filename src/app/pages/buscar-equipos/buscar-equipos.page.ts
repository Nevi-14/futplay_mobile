import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {
  textoBuscar = ''
  constructor(
public equiposService:EquiposService,
public usuariosService:UsuariosService,
public modalCtrl:ModalController
  ) { }

  ngOnInit() {

    this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{
      this.equiposService.equipos = resp;


    })
      }

      cerrarModal(){

        this.modalCtrl.dismiss()
      }

      filtroUbicacion(){



      }

      onOpenMenu(equipo){

        
      }
}
