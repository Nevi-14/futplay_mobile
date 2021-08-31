import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransferenciasPage } from '../transferencias/transferencias.page';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  face = '../assets/search/face.svg';
  star = '../assets/search/star.svg';
  message = '../assets/search/message.svg';
  save = '../assets/search/save.svg';
  constructor() { }


  ngOnInit() {
  }

}
