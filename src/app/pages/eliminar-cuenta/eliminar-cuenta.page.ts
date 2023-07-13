import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.page.html',
  styleUrls: ['./eliminar-cuenta.page.scss'],
})
export class EliminarCuentaPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
public usuariosService:UsuariosService,
public equiposService: EquiposService,
public reservacionesService: ReservacionesService,
public alertasService: AlertasService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();

  }
  eliminarCuenta(){
    this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(equipos =>{

      let continuar = true;


      if(equipos.length == 0){

        return this.usuariosService.syncDeleteUserToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{

          this.alertasService.message('FUTPLAY', 'El Perfil se elimino con éxito.');
          this.modalCtrl.dismiss(true)
          this.usuariosService.cerrarSession();
           
      
        })
      
    }
      for(let i =0; i < equipos.length; i++){

    this.reservacionesService.syncGetReservcionesFuturas(equipos[i].equipo.Cod_Equipo, format(new Date(), 'yyy-MM-dd')).then(reservaciones =>{

    if(reservaciones.length > 0 && equipos[i].equipo.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario){
      continuar = false;
    }
    })

        if(i == equipos.length -1){

          console.log('continuar', continuar)
if(continuar){
  this.usuariosService.syncDeleteUserToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{

    this.alertasService.message('FUTPLAY', 'El Perfil se elimino con éxito.');
          this.modalCtrl.dismiss(true)
          this.usuariosService.cerrarSession();

  })

}else{
this.alertasService.message('FUTPLAY', 'Lo sentimos no se puede elminar el perfil, debes de cancelar todas las reservaciones antes de proceder.')

}

        }
      }
      
    });



  

    
  }
}
