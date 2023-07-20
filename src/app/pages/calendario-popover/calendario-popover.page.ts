import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
 

@Component({
  selector: 'app-calendario-popover',
  templateUrl: './calendario-popover.page.html',
  styleUrls: ['./calendario-popover.page.scss'],
})
export class CalendarioPopoverPage implements OnInit {
  @Input() fecha: Date;

 max = new Date().getFullYear() +3
  constructor(
    public popOverCtrl: PopoverController,
    private cd: ChangeDetectorRef,
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
   


  }
  regresar(){
    this.modalCtrl.dismiss();
  }
 async formatDate() {

  return this.modalCtrl.dismiss({
    fecha:this.fecha
  })
   
  }
}
