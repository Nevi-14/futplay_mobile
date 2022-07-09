import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { ConfiguracionHorarioService } from 'src/app/services/configuracion-horario.service';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';

@Component({
  selector: 'app-configuracion-horario',
  templateUrl: './configuracion-horario.page.html',
  styleUrls: ['./configuracion-horario.page.scss'],
})
export class ConfiguracionHorarioPage implements OnInit {
  public tipos  =[{nombre:'1',valor:'general'},{nombre:'2',valor:'cumpleanos'},{nombre:'3',valor:'seguridad'}];
  public selectedType: string ='general';
  @Input() cancha: ListaCanchas;

  constructor(

    public horarioCanchasService:HorarioCanchasService,
    public modalCtrl: ModalController,
  public configuracionHorarioService:ConfiguracionHorarioService
  ) { }

  ngOnInit() {

console.log(this.configuracionHorarioService.horarioCancha,'horarioCancha')
if (this.cancha){
  this.horarioCanchasService.syncHorarioCanchasPromise(this.cancha.Cod_Cancha).then((resp:any) =>{
    console.log(resp,'resp')
this.configuracionHorarioService.horarioCancha = resp;
  })
}
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

  guardar(){
    if(this.cancha){
      this.horarioCanchasService.actualizaHorario(this.configuracionHorarioService.horarioCancha)
    }
 this.cerrarModal();
  }

}
