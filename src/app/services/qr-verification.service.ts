import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ModalController, NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';
import { QrVerificationPage } from '../pages/qr-verification/qr-verification.page';
import { QrVerificationDetailsPage } from '../pages/qr-verification-details/qr-verification-details.page';
@Injectable({
  providedIn: 'root'
})
export class QrVerificationService {

  guardados: Registro[]=[];
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    public modalCtrl: ModalController

  ) { }


  async getStorage(){
    this.guardados =    (await this.storage.get('registros')) || [];
      console.log( this.guardados)
    }
  
  
    async guardarRegistro(format: string, text: string){
    
      await this.getStorage();
  
      const nuevoRegistro = new Registro(format,text);
      this.guardados.unshift(nuevoRegistro);
      console.log(this.guardados)
     this.storage.set('registros',this.guardados)
     this.abrirRegistro(nuevoRegistro)
  
    }
  
  
  
    abrirRegistro(registro: Registro){
  
     // this.navCtrl.navigateForward('/tabs/tab2');
      switch(registro.type){
        case 'http':
   // abrir navegador web

      break;
       case 'no reconocido':
  
       this.openModal(registro);
        break;
  
  
      }
  
    }
  
  
    async openModal(registro: Registro){
  
      const modal = await this.modalCtrl.create({
        component: QrVerificationDetailsPage,
        cssClass: 'my-custom-class',
        componentProps: {
          registro: registro
        }
      });
      return await modal.present();
   
    }
}
