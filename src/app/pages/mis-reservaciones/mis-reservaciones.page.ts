import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, ModalController, ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { CanchasService } from '../../services/canchas.service';
import { PartidoService } from 'src/app/services/partido.service';
import { partidos } from 'src/app/models/partidos';
import { VerificacionQrPage } from '../verificacion-qr/verificacion-qr.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { EliminarRetoPage } from '../eliminar-reto/eliminar-reto.page';
 
@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.page.html',
  styleUrls: ['./mis-reservaciones.page.scss'],
})
export class MisReservacionesPage implements OnInit {
  categories = ['Confirmados','Recibidos','Enviados','Historial','Revisión','Canceladas'];
  @ViewChild(IonSlides) slider: IonSlides;
textoBuscar = '';
partido:partidos[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public canchasService:CanchasService,
public partidosService:PartidoService,
public actionSheetCtrl: ActionSheetController
  ) {

     
  }
  ngOnInit() {
    this.reservacionesService.segment = 0;
    this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
this.reservacionesService.reservaciones = reservaciones;
console.log('reservaciones', this.reservacionesService.reservaciones)
    })
  }

  async detalleReto(reto:PerfilReservaciones) {


    
if(reto.reservacion.Cod_Estado == 7){
  await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
    this.partido = partido;


    console.log('partido', partido)
    
    
            })

}



    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
        partido:this.partido
      },
      id:'aceptar-reto'
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
    this.reservacionesService.selectCategory();
  }
  cerrarModal (){

 this.modalCtrl.dismiss();
  }
  async nuevaReservacion(){

  
     
    const modal  = await this.modalCtrl.create({
      component: GenerarReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:null,
      retador:null,
      cancha:null

     }
   });
   await modal .present();
 }
  async segmentChanged() {

    if(this.slider){
      await this.slider.slideTo(this.reservacionesService.segment);
      this.slider.update();
    }

  }
  async slideChanged() {
 //   this.segment =  await this.slider.getActiveIndex();
 this.reservacionesService.segment =  await this.slider.getActiveIndex();
    this.focusSegment(this.reservacionesService.segment);
   
    
  }

  selectCategory(i){
    this.reservacionesService.segment = i;
    this.reservacionesService.selectCategory()

  }
  
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  focusSegment(segmentId) {
    document.getElementById('seg-'+segmentId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    this.reservacionesService.selectCategory()
  }

  async next(){
    this.reservacionesService.segment =  Number(this.reservacionesService.segment) +1;
 if(this.reservacionesService.segment <= this.categories.length -1){
 
   await this.slider.slideTo(this.reservacionesService.segment);
   this.slider.update();
   if(this.reservacionesService.segment == this.categories.length -1){
  
    this.reservacionesService.segment = this.categories.length-1;
    this.slider.update();
   }
   this.reservacionesService.selectCategory()
 }
   }
   async prev(){
    this.reservacionesService.segment = Number(this.reservacionesService.segment)  -1;
 
     if(this.reservacionesService.segment >= 0 && this.reservacionesService.segment <= this.categories.length){
       //alert(this.segment)
     
       await this.slider.slideTo(this.reservacionesService.segment);
       this.slider.update();
     }else{
 
      this.reservacionesService.segment =  Number(this.reservacionesService.segment) -1;
       this.slider.update();
     }
     this.reservacionesService.selectCategory()
 
    }
 


        async onOpenMenu(reto:PerfilReservaciones){
          console.log('reto', reto)
      
            let btnData = [
              {   
                text: 'Detalle Reto',
                icon:'person-outline',
                handler: () =>{ 
this.detalleReto(reto);
                }
               
               },
            
              {   
                text: 'Eliminar Reto',
                icon:'trash-outline',
                handler: () =>{
                 // this.videoScreen(3);
    
                 this.eliminarReto(reto);
                }
               
               },       
              
               {   
                text: 'Cancelar',
                icon:'close-outline',
               role:'cancel',
               
               }
            
              ]
            const normalBtns : ActionSheetButton[] = []
            if(reto.reservacion.Cod_Estado == 5 || reto.reservacion.Cod_Estado == 4){      
let btnIniciarPartido = {   
  text: reto.reservacion.Cod_Estado == 4 ? 'Iniciar Partido' : 'Continuar Partido',
  icon:'paper-plane-outline',
  handler: () =>{
this.iniciarPartido(reto)
  }
 
 }
normalBtns.push(btnIniciarPartido)
            }


            for(let i =0; i < btnData.length; i++){
              normalBtns.push(btnData[i])
              if( i == btnData.length -1){
                const actionSheet = await this.actionSheetCtrl.create({
                  header:'Opciones',
                  cssClass: 'left-align-buttons',
                  buttons:normalBtns,
                  mode:'ios'
                });
              
              
              
              
              
              await actionSheet.present();

              }


            }
        
        
        
  
        
     
           
            
              }
              

         async     iniciarPartido(reto:PerfilReservaciones){

          let partido =   await  this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion);
                 
                 if(partido.length == 0){
                  this.qrVerification(reto);
                 }else  if(!partido[0].Verificacion_QR || !partido[1].Verificacion_QR){
            
                    this.qrVerification(reto);
                  }else{
                  
                    this.partidoActual(reto);
                  }
             
            
              }

              async qrVerification(reto:PerfilReservaciones){
    
                let partido =   await  this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion);
                this.cerrarModal();
                
                    const modal = await this.modalCtrl.create({
                     component: VerificacionQrPage,
                     cssClass:'large-modal',
                     componentProps:{
                    reto:reto,
                    partido:partido
                       
                     }
                 
                    });
                
                    
                 
                 return await modal.present();
                
                
                     }

                     async partidoActual(reto:PerfilReservaciones) {

                      let partido =   await  this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion);
    

                      const modal = await this.modalCtrl.create({
                        component:InicioPartidoPage,
                        cssClass: 'my-custom-class',
                        componentProps:{
                          reto:reto,
                          partido:partido
                        },
                        id:'inicio-partido'
                      });
                    
                      await modal.present();
                      let {data} = await modal.onDidDismiss();
                
                
                      this.reservacionesService.selectCategory();

                      if(data != undefined){

                        
                       }
                    }


                    async eliminarReto(reto:PerfilReservaciones){

                      let modal = await this.modalCtrl.create({
                        component:EliminarRetoPage,
                        cssClass:'medium-modal',
                        componentProps:{
                          reto:reto
                        }
                      })
                    
                    
                    
                       await modal.present();
                  
                       const { data } = await modal.onDidDismiss();
                       console.log('data eli', data)
                       this.reservacionesService.selectCategory();
                       if(data != undefined){
                        //this.modalCtrl.dismiss(null,null,'aceptar-reto');
                        
                       }
                    }
                
}
