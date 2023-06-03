import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';
import { CrearEquipoPage } from '../crear-equipo/crear-equipo.page';
import { CrearUnirseEquipoPage } from '../crear-unirse-equipo/crear-unirse-equipo.page';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-mis-equipos',
  templateUrl: './mis-equipos.page.html',
  styleUrls: ['./mis-equipos.page.scss'],
})
export class MisEquiposPage implements OnInit {
  img =  'assets/main/my-clubs.svg';
  btn1 = true;
  btn2 = false;
  textoBuscar ='';
  constructor(
    public equiposService: EquiposService,
     public modalCtrl: ModalController, 
     public popOverCtrl: PopoverController,
      public user: UsuariosService,
        public router: Router,
        public jugadoresService:JugadoresService
        ) { }

  ngOnInit() {


    this.misEquipos();
  }

 
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  misEquipos(){

 
    this.btn1 = true;
    this.btn2 = false;
    this.equiposService.syncMisEquiposToPromise(this.user.usuarioActual.usuario.Cod_Usuario).then(resp=>{

      if(this.equiposService.misEquipos.length < resp.length){
        this.equiposService.misEquipos = [];
        this.equiposService.misEquipos = resp;

      }

          })
  }
  otrosEquipos(){
    this.btn1 = false;
    this.btn2 = true;
    this.equiposService.equipos = [];
 /**
  *    this.equiposService.SyncOtrosEquipos(this.user.usuarioActual.Cod_Usuario).then(resp=>{
console.log('resp', resp)
      this.equiposService.otrosEquipos = resp;
    })
  */
  }
  async crearUniserseEquipo(){
    let modal = await this.modalCtrl.create({
      component:CrearUnirseEquipoPage,
      cssClass:'my-custom-class',
      id:'create-join-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
 
    if(data !== undefined ){
      console.log(data,'data')


      
    }

  }

 

  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }

  
  async unirseEquipo(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

    return await modal.present();
  }
seleccionarEquipo(equipo){
  this.equiposService.equipo = equipo

 
  this.jugadoresService.syncJugadoresEquipos( equipo.Cod_Equipo).then( jugadores =>{
    this.jugadoresService.jugadores = []
    this.jugadoresService.jugadores = jugadores;

    this.modalCtrl.dismiss({
      equipo:equipo
    });
    
  })
  

}
regresar(){
    this.modalCtrl.dismiss();
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onDidDismiss();
if(data != undefined){
  
}
  }
  async crearEquipo(){
    let modal = await this.modalCtrl.create({
      component:CrearEquipoPage,
      cssClass:'my-custom-class',
      id:'create-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
 
    if(data !== undefined ){
      console.log(data,'data')
      this.regresar();
    }

  }

  async buscarEquipos(){
    let modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-custom-class'

    })

    return modal.present();
  }
}