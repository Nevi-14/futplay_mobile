import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-contactar-desarollador',
  templateUrl: './contactar-desarollador.page.html',
  styleUrls: ['./contactar-desarollador.page.scss'],
})
export class ContactarDesarolladorPage {


  constructor(private iab: InAppBrowser, 
    private translate: TranslateService,
    public modalCtrl:ModalController
    ) { }

  openWhatsApp() {
    const message = this.translate.instant('CONTACT_DEVELOPER_WHATSAPP_MESSAGE');
    const url = `https://wa.me/+50662962461?text=${encodeURIComponent(message)}`;
    this.iab.create(url, '_system');
  }

  openEmail() {
    const subject = this.translate.instant('CONTACT_DEVELOPER_EMAIL_SUBJECT');
    const body = this.translate.instant('CONTACT_DEVELOPER_EMAIL_BODY');
    const url = `workemailnelson@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.iab.create(url, '_system');
  }

  regresar(){
this.modalCtrl.dismiss();
  }
}
