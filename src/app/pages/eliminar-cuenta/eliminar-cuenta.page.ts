import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.page.html',
  styleUrls: ['./eliminar-cuenta.page.scss'],
})
export class EliminarCuentaPage implements OnInit {

  constructor(
public modalCtrl:ModalController,
public usuariosServie:UsuariosService,
public authenticationService: AuthenticationService,
public alertasService: AlertasService

  ) { }

  ngOnInit() {
  }

  cerrarModal(){

this.modalCtrl.dismiss();
  }


  eliminarCuenta(){
    this.usuariosServie.syncDeleteUsuarioToPromise(this.usuariosServie.usuarioActual.Cod_Usuario).then(deleted =>{

      this.cerrarModal();
      this.cerrarModal();
      this.modalCtrl.dismiss(null,null,'perfil-usuario');
      this.authenticationService.deleteAccount();
      this.alertasService.message('FUTPLAY', 'Su cuenta ha sido eliminada, vuelve pronto.')

    })
  }
}
