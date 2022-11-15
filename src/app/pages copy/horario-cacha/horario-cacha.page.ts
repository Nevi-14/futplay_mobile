import { Component, OnInit } from '@angular/core';
import { ConfiguracionHorarioService } from 'src/app/services/configuracion-horario.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-horario-cacha',
  templateUrl: './horario-cacha.page.html',
  styleUrls: ['./horario-cacha.page.scss'],
})
export class HorarioCachaPage implements OnInit {

  constructor(
    public configuracionHorarioService: ConfiguracionHorarioService,
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  retornaHoraAmPm(hours){


    let minutes = null;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let hourValue = hours +':'+'00'+':'+'00'+' ' + ampm;
    
    
    return hourValue;
    
    }


}
