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
  @Input() partido: HistorialPartido
  swiperOpts = {
    allowSlidePrev:false,
    allowSlideNext:false
  };

  constructor(
public modalCtrl: ModalController,
public barcodeScanner: BarcodeScanner,
public qrVerificationService: QrVerificationService,
public historialPartidoService: HistorialPartidoService,
public usuariosService:UsuariosService

  ) { }

  ngOnInit() {

    console.log(this.reto,this.cancha,this.retador,this.rival, this.partido)
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  scan(){
   
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
  
  if(!barcodeData.cancelled){
    this.actualizarQR();
  //this.qrVerificationService.guardarRegistro(barcodeData.format, barcodeData.text)
  }
  
     }).catch(err => {
         console.log('Error', err);
        this.qrVerificationService.guardarRegistro('QRCode', 'https://dev-coding.com')
     });
  }

  actualizarQR(){

    if(this.usuariosService.usuarioActual.Cod_Usuario == this.reto.Cod_Usuario){
      this.partido.Verificacion_QR_Retador = true ;

      this.historialPartidoService.actualizarPartidoQR(this.partido, this.reto.Cod_Reservacion)
    }else if(this.usuariosService.usuarioActual.Cod_Usuario == this.reto.Cod_Usuario_Rival){
      this.partido.Verificacion_QR_Rival = true ;
      this.historialPartidoService.actualizarPartidoQR(this.partido, this.reto.Cod_Reservacion)
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
