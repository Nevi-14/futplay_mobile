import { Component, Input, OnInit } from '@angular/core';
import { HistorialPartidoService } from 'src/app/services/historial-partido.service';
import { QrVerificationService } from 'src/app/services/qr-verification.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { GestionRetos } from 'src/app/models/gestionRetos';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { HistorialPartido } from 'src/app/models/historialPartido';
import { AlertasService } from 'src/app/services/alertas.service';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';

@Component({
  selector: 'app-verificacion-qr',
  templateUrl: './verificacion-qr.page.html',
  styleUrls: ['./verificacion-qr.page.scss'],
})
export class VerificacionQrPage implements OnInit {

  @Input() reto: GestionRetos
  @Input() cancha : ListaCanchas
  @Input() retador;
  @Input() equipo:vistaEquipos;
  @Input() rival;
  @Input() partido: HistorialPartido[]
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
public historialPartidoService: HistorialPartidoService,
public usuariosService:UsuariosService,
public alertasService: AlertasService,
public gestionReservacionesService:GestionReservacionesService
  ) { }

  ngOnInit() {
    let i = this.partido.findIndex(partido => partido.Cod_Equipo == this.reto.Cod_Rival);
if(i == 0){
  this.rivalIndex = 0;
  this.retadorIndex = 1;
}else{
  this.rivalIndex = 1;
  this.retadorIndex = 0;
}

  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  scan(){


    console.log(this.reto)
    let today = new Date();
    this.gestionReservacionesService.compararFechas(this.reto.Fecha,today).then(resp =>{
console.log(resp, 'fecha')
if(resp === 0){
  this.barcodeScanner.scan().then(barcodeData => {
    // validar el codigo del qr que sea el de la cancha
    // Vaidar Fecha, hora incio  media hora antes
          let Cod_Cancha = barcodeData.text;
          if(this.reto.Cod_Cancha != Number(Cod_Cancha) ){
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
    });
 

  }

  actualizarQR(){

    if(this.usuariosService.usuarioActual.Cod_Usuario == this.reto.Cod_Usuario){


      this.partido[this.retadorIndex].Verificacion_QR = true ;

      this.historialPartidoService.actualizarPartidoQR(this.partido[this.retadorIndex], this.reto.Cod_Reservacion)
    }else{
     
 
      this.partido[this.rivalIndex].Verificacion_QR = true ;
      this.historialPartidoService.actualizarPartidoQR(this.partido[this.rivalIndex], this.reto.Cod_Reservacion)
    }
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
        reto:this.reto,
        cancha:this.cancha,
        retador:this.retador,
        rival:this.rival,
        equipo: this.equipo,
        partido: this.partido
      }
    });
    return await modal.present();
  }

}
