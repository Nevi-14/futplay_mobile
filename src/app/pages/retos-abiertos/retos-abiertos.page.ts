import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { PartidoService } from 'src/app/services/partido.service';
import { partidos } from 'src/app/models/partidos';
import { VerificacionQrPage } from '../verificacion-qr/verificacion-qr.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { EliminarRetoPage } from '../eliminar-reto/eliminar-reto.page';

@Component({
  selector: 'app-retos-abiertos',
  templateUrl: './retos-abiertos.page.html',
  styleUrls: ['./retos-abiertos.page.scss'],
})
export class RetosAbiertosPage implements OnInit {
reservaciones:PerfilReservaciones[]=[];
partido:partidos[]=[]
textoBuscar = '';
  constructor(
    public modalCtrl:ModalController,
public reservacionesService:ReservacionesService,
public actionSheetCtrl: ActionSheetController,
public partidosService:PartidoService

  ) { }

 async  ngOnInit() {
  this.reservaciones =    await    this.reservacionesService.syncGetReservacionesAbiertasToPromise();
  console.log(this.reservaciones)
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  
 

        async detalleReto(reto:PerfilReservaciones) {


    

          await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
            this.partido = partido;
        
        
            console.log('partido', partido)
            
            
                    })
        
        
        
        
        
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
            this.reservaciones =    await    this.reservacionesService.syncGetReservacionesAbiertasToPromise();
            this.reservacionesService.selectCategory();
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
