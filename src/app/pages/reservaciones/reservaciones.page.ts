import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { PartidoService } from 'src/app/services/partido.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { EliminarRetoPage } from '../eliminar-reto/eliminar-reto.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { VerificacionQrPage } from '../verificacion-qr/verificacion-qr.page';
import { partidos } from 'src/app/models/partidos';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {
  partido:partidos[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public modalCtrl:ModalController,
public actionSheetCtrl:ActionSheetController,
public partidosService:PartidoService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
this.modalCtrl.dismiss()
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
