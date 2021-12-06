import { AfterViewInit, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements  AfterViewInit{
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }
  viewTitle: string;
  event = {
    title: '',
    desc:'',
    startTime:null,
    endTime:'',
    allDay: false,
    date: new Date()
  }
  modalReady = false;
  constructor(public modalCtrl: ModalController) { }



  ngAfterViewInit(){
    setTimeout(()=>{
      this.modalReady = true;
    }, 0)
  }

  save(){
    this.modalCtrl.dismiss({event: this.event})
    console.log({event: this.event})
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onTimeSelected(ev){
    console.log('ev',ev)
   this.event.date = new Date(ev.selectedTime)
  }
close(){
  this.modalCtrl.dismiss();
}
}
