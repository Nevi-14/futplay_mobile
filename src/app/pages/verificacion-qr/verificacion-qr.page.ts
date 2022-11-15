import { Component, Input, OnInit } from '@angular/core';
import { QrVerificationService } from 'src/app/services/qr-verification.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';

import { AlertasService } from 'src/app/services/alertas.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from '../../services/reservaciones.service';
import { format } from 'date-fns';
import { PartidoService } from '../../services/partido.service';
import { partidos } from '../../models/partidos';


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

  constructor(
public modalCtrl: ModalController,
public barcodeScanner: BarcodeScanner,
public qrVerificationService: QrVerificationService,
public usuariosService:UsuariosService,
public alertasService: AlertasService,
public gestionReservacionesService:ReservacionesService,
public partidosService:PartidoService
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

  actualizarQR(){

    if(this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.reto.retador.Cod_Usuario){

      this.partido[0].Verificacion_QR = true;
      this.partidosService.syncPutPartidoCodigoQR(this.partido[0]).then((resp:any) =>{
console.log('actualizado', resp)
this.alertasService.message(' FUTPLAY', resp.message)
      }, error =>{
        this.alertasService.message(' FUTPLAY', 'error')
        
      })

       
       
    }else{
      this.partido[1].Verificacion_QR = true;
      this.partidosService.syncPutPartidoCodigoQR(this.partido[1]).then((resp:any) =>{
console.log('actualizado', resp)
this.alertasService.message(' FUTPLAY', resp.message)
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