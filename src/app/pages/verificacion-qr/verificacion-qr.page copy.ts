import { Component, Input, OnInit } from '@angular/core';
import { QrVerificationService } from 'src/app/services/qr-verification.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController, AlertController } from '@ionic/angular';

import { AlertasService } from 'src/app/services/alertas.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from '../../services/reservaciones.service';
import { format } from 'date-fns';
import { PartidoService } from '../../services/partido.service';
import { partidos } from '../../models/partidos';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';


@Component({
  selector: 'app-verificacion-qr',
  templateUrl: './verificacion-qr.page.html',
  styleUrls: ['./verificacion-qr.page.scss'],
})
export class VerificacionQrPage implements OnInit {

  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  rivalIndex = null;
  retadorIndex  = null;
  swiperOpts = {
    allowSlidePrev:false,
    allowSlideNext:false
  };
  count:number = 0;
verificar = false;
  constructor(
public modalCtrl: ModalController,
public barcodeScanner: BarcodeScanner,
public qrVerificationService: QrVerificationService,
public usuariosService:UsuariosService,
public alertasService: AlertasService,
public gestionReservacionesService:ReservacionesService,
public partidosService:PartidoService,
public alertCtrl:AlertController
  ) { }

  ngOnInit() {
/**
 *     let i = this.partido.findIndex(partido => partido.Cod_Equipo == this.reto.Cod_Rival);
if(i == 0){
  this.rivalIndex = 0;
  this.retadorIndex = 1;
}else{
  this.rivalIndex = 1;
  this.retadorIndex = 0;
}
 */
console.log(this.reto, this.partido)
if(this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.reto.retador.Cod_Usuario){

  if(this.partido[0].Verificacion_QR){
    this.alertasService.presentaLoading('Esperando Equipo..');
    this.loading();

  }

}else{

  if(this.partido[1].Verificacion_QR){
    this.alertasService.presentaLoading('Esperando Equipo..');
    this.loading();

  }

}



  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  scan(){


    console.log(this.reto)
    let today = format(new Date(), 'yyyy-MM-dd');
    let date = String( this.reto.reservacion.Fecha);
    if(today === date){
      this.barcodeScanner.scan().then(barcodeData => {
        // validar el codigo del qr que sea el de la cancha
        // Vaidar Fecha, hora incio  media hora antes
              let Cod_Cancha = barcodeData.text;
              if(this.reto.cancha.Cod_Cancha != Number(Cod_Cancha) ){
        this.alertasService.message('FUTPLAY','Codigo QR no corresponde a la cancha correcta')
                return
              }
              console.log('Barcode data', barcodeData);
          
          if(!barcodeData.cancelled){
            this.actualizarQR();
          //this.qrVerificationService.guardarRegistro(barcodeData.format, barcodeData.text)
          }
          
             }).catch(err => {
                 console.log('Error', err);
                this.qrVerificationService.guardarRegistro('QRCode', 'https://dev-coding.com')
             });
    }else{
      this.alertasService.message('FUTPLAY','Reservación no corresponde al dia de hoy')
    
    }
 

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
        this.modalCtrl.dismiss(null,null,'aceptar-reto')
        
      }

      async finalizarLoader() {
        this.count = 0;
        this.alertasService.loadingDissmiss();
        this.verificar = true;

        const alert = await this.alertCtrl.create({
          header: 'FUTPLAY',
          message:'¿Necesitas mas tiempo?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler:()=>{
              
              }
              
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
    this.verificar = false;
    this.alertasService.presentaLoading('Esperando Equipo..');
                this.loading();
                
              },
            },
          ],
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();


      
        
      }
    
      verificarQR(){
        this.alertasService.presentaLoading('Esperando Equipo..');
        this.loading();
      }
  


loading(){

  if(this.count === 15){
    this.finalizarLoader();
 
    return;
  }


    setTimeout(async ()=>{

     await  this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion).then(partido =>{
        this.partido = partido;
        this.count = this.count + 1;
  if(this.partido[0].Verificacion_QR && this.partido[1].Verificacion_QR){
    this.alertasService.loadingDissmiss();
    this.cerrarModal();
    this.partidoActual()
  }else{

    this.loading();
  }
      });



  

    }, 1000)
  }

  async partidoActual() {

      
    

    const modal = await this.modalCtrl.create({
      component:InicioPartidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        reto:this.reto,
        partido:this.partido
      },
      id:'inicio-partido'
    });
  
    await modal.present();
    let {data} = await modal.onDidDismiss();


   this.cerrarModal()
  }


  actualizarQR(){

    if(this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.reto.retador.Cod_Usuario){

      this.partido[0].Verificacion_QR = true;
      this.partidosService.syncPutPartidoCodigoQR(this.partido[0]).then((resp:any) =>{
        this.partido = resp;

        if(this.partido[0].Verificacion_QR && this.partido[1].Verificacion_QR){
          this.cerrarModal();
          this.partidoActual()
          
        }else{
          this.alertasService.presentaLoading('Esperando Equipo..');
          this.loading();

        }


      }, error =>{
        this.alertasService.message(' FUTPLAY', 'error')
        
      })

       
       
    }else{
      this.partido[1].Verificacion_QR = true;
      this.partidosService.syncPutPartidoCodigoQR(this.partido[1]).then((resp:any) =>{
console.log('actualizado', resp)
this.partido = resp;
if(this.partido[0].Verificacion_QR && this.partido[1].Verificacion_QR){
  this.cerrarModal();
  this.detalleReto(this.reto)
 
}else{
  this.alertasService.presentaLoading('Esperando Equipo..');
this.loading();
}

//this.alertasService.message(' FUTPLAY', resp.message)
      }, error =>{
        this.alertasService.message(' FUTPLAY', 'error')
        
      })
       
  
    }

    this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion).then(partido =>{
      this.partido = partido;
if(this.partido[0].Verificacion_QR && this.partido[1].Verificacion_QR){
  this.cerrarModal();
}
    });


  }
  abrirRegistro(registro){
    this.qrVerificationService.abrirRegistro(registro);
  }

  async iniciar() {
    this.modalCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: InicioPartidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        reto:this.reto
        
      }
    });
    return await modal.present();
  }

}