import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilUsuario } from 'src/app/models/perfilUsuario';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.page.html',
  styleUrls: ['./perfil-jugador.page.scss'],
})
export class PerfilJugadorPage implements OnInit {
@Input() perfil:PerfilUsuario;
userPic = null;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userPic = this.perfil.Foto ?  'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/' + this.perfil.Foto +'?'+ this.dateF() : 'assets/user.svg';;
    console.log(this.perfil, 'perfil')
  }

  calcularEdad(fechaNacimiento:Date){

     
    let todayYear = new Date().getFullYear()
    let userYear = new Date(fechaNacimiento).getFullYear();
    let age = todayYear - userYear;

return age;

  }
  
  dateF(){
    return new Date().getTime() 
  }
  cerrarModal(){

    this.modalCtrl.dismiss();
  }
}
