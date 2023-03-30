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
import { PerfilJugador } from 'src/app/models/perfilJugador';
import { JugadoresService } from 'src/app/services/jugadores.service';


@Component({
  selector: 'app-verificacion-qr',
  templateUrl: './verificacion-qr.page.html',
  styleUrls: ['./verificacion-qr.page.scss'],
})
export class VerificacionQrPage implements OnInit {
  jugadoresPermitidosRetador:PerfilJugador[]=[]
  jugadoresPermitidosRival:PerfilJugador[]=[]
  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  rivalIndex = null;
  retadorIndex:boolean = false;
  swiperOpts = {
    allowSlidePrev:false,
    allowSlideNext:false
  };
  count:number = 0;
verificar = false;
allowUser = false;
  constructor(
public modalCtrl: ModalController,
public barcodeScanner: BarcodeScanner,
public qrVerificationService: QrVerificationService,
public usuariosService:UsuariosService,
public alertasService: AlertasService,
public gestionReservacionesService:ReservacionesService,
public partidosService:PartidoService,
public alertCtrl:AlertController,
public reservacionesService: ReservacionesService,
public jugadoresService: JugadoresService
  ) { }

  async ngOnInit() {
    this.jugadoresPermitidosRetador = await this.jugadoresService.syncJugadoresEquipos(this.reto.retador.Cod_Equipo);
    this.jugadoresPermitidosRival = await this.jugadoresService.syncJugadoresEquipos(this.reto.rival.Cod_Equipo);
    let indexRetador = this.jugadoresPermitidosRetador.findIndex(user =>  user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.usuario.Cod_Usuario);
    let indexRival = this.jugadoresPermitidosRival.findIndex(user =>  user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.usuario.Cod_Usuario);

    if(indexRetador >=0){
      this.retadorIndex = true;
    }

if(this.partido.length > 0){


  if(indexRetador >=0 && indexRival >=0){


    if(this.partido[0].Verificacion_QR && !this.partido[1].Verificacion_QR ){
      this.alertasService.presentaLoading('Esperando Equipo..');
      this.loading();
    }else{
      this.allowUser = true;
    }



  }else if( indexRetador < 0 && this.partido[1].Verificacion_QR && !this.partido[0].Verificacion_QR){
    this.alertasService.presentaLoading('Esperando Equipo..');
    this.loading();
  }else{
    this.allowUser = true;
  }
   
  
}
 

  }



  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  scan(){
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

            if(this.partido.length > 0){
              this.actualizarQR();
            }else{

              this.reto.detalle.Cod_Estado = 6;
              this.reservacionesService.syncPutDetalleReservaion(this.reto.detalle).then(resp =>{
                this.alertasService.loadingDissmiss();
           

                this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
                  this.reservacionesService.reservaciones = reservaciones;
                  this.cerrarModal();
                  this.alertasService.message('FUTPLAY', 'El partido se inicio con éxito ')
        
                })


            
              }, error =>{
                this.alertasService.loadingDissmiss();
                this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal.')
              })
              
            }
       
          }        
             }).catch(err => {
                 console.log('Error', err);
                this.qrVerificationService.guardarRegistro('QRCode', 'https://futplaycompany.com/')
             });
    }else{
      this.alertasService.message('FUTPLAY','Reservación no corresponde al dia de hoy')
    
    }
 

  }

  async detalleReto(reto:PerfilReservaciones) {

    if(reto.reservacion.Cod_Estado == 7){
      await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
        this.partido = partido;     
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


      amPM(date:string){
       return new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
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

/**
 *   async partidoActual() {
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

 */

  actualizarQR(){

    if(this.retadorIndex){


    
      this.partido[0].Verificacion_QR = true;
      this.partidosService.syncPutPartidoCodigoQR(this.partido[0]).then((resp:any) =>{
        this.partido = resp;
        if(this.partido[0].Verificacion_QR && this.partido[1].Verificacion_QR){
          this.cerrarModal();
          this.partidoActual();
          
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
  this.partidoActual();
      
 
}else{
  this.alertasService.presentaLoading('Esperando Equipo..');
this.loading();
}
      }, error =>{
        this.alertasService.message(' FUTPLAY', 'error')
        
      })
       
  
    }



  }
  async partidoActual() {

    let partido =   await  this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion);
    const modal = await this.modalCtrl.create({
      component:InicioPartidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        reto:this.reto,
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