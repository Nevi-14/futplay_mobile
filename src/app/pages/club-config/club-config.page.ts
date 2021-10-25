import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Club } from '../../models/club';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
import { ClubService } from '../../services/club.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-club-config',
  templateUrl: './club-config.page.html',
  styleUrls: ['./club-config.page.scss'],
})
export class ClubConfigPage implements OnInit {
  @Input() club: Club;
  clubInfo = {
    clubID: this.clubs.switchClub.clubID,
    usuarioID: this.clubs.switchClub.usuarioID,
    provinciaID: this.clubs.switchClub.provinciaID,
    cantonID: this.clubs.switchClub.cantonID,
    distritoID: this.clubs.switchClub.distritoID,
    foto: this.clubs.switchClub.foto,
    nombre: this.clubs.switchClub.nombre,
    abreviacion: this.clubs.switchClub.abreviacion,
    direccion: this.clubs.switchClub.direccion
 }
  constructor(private modalCtrl: ModalController, private provincias: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService, private clubs: ClubService) { }

  ngOnInit() {
    console.log(this.club.provinciaID);
  }
  cerrarModal(){
this.modalCtrl.dismiss();
  }
  onSubmit(formulario: NgForm){
    this.clubs.editClub(this.club.clubID, this.club);
    this.modalCtrl.dismiss();
  }
}
