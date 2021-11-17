import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(public data: DataService, public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
