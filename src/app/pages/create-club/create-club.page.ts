import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ClubService } from '../../services/club.service';
import { Club } from 'src/app/models/club';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.page.html',
  styleUrls: ['./create-club.page.scss'],
})
export class CreateClubPage implements OnInit {

  constructor(private modalCtrl: ModalController, private data: DataService, private clubService: ClubService, private provincias: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService, private usuario: UserService) { }

club = {
   clubID: 1,
   usuarioID: this.usuario.currentUser.usuarioID,
   provinciaID: 1,
   cantonID: 1,
   distritoID: 1,
   foto: '../assets/profile/nopicture.svg',
   nombre: '',
   abreviacion: '',
   direccion: ''
}
  ngOnInit() {
   console.log(this.club.distritoID)
  }
  onSubmit(formulario: NgForm){
    this.clubService.club.push(new Club(this.club.cantonID,this.club.usuarioID,this.club.provinciaID,this.club.cantonID,this.club.distritoID,this.club.foto,this.club.nombre,this.club.abreviacion,this.club.direccion));
    console.log(this.club, this.clubService.club.length);
    this.clubService.checkIfHasClub();
    this.modalCtrl.dismiss();
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }



}
