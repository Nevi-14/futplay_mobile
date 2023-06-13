import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilUsuario } from 'src/app/models/perfilUsuario';
import { PerfilJugador } from '../../models/perfilJugador';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.page.html',
  styleUrls: ['./perfil-jugador.page.scss'],
})
export class PerfilJugadorPage implements OnInit {
@Input() perfil:any;
userPic = null;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userPic = this.perfil.usuario.Foto ?  'https://futplaycompany.com/api_test/' + this.perfil.usuario.Foto  : 'assets/user.svg';;
    console.log(this.perfil, 'perfil')
  }

  calcularFecha(fecha){
    var dob = new Date(fecha);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
  }
  
  dateF(){
    return new Date().getTime() 
  }
  regresar(){

    this.modalCtrl.dismiss();
  }

  calcularEdad(fechaNacimiento:Date){
    const dob = new Date(fechaNacimiento);
    //calculate month difference from current date in time
    const month_diff = Date.now() - dob.getTime();
    //convert the calculated difference in date format
    const age_dt = new Date(month_diff); 
    //extract year from date    
    const year = age_dt.getUTCFullYear();
    //now calculate the age of the user
    const age = Math.abs(year - 1970);
  return age;
    }
}