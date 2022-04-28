import { ChangeDetectorRef ,Component, ViewChild, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { IonDatetime, ModalController, PickerController } from '@ionic/angular';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { CanchasReservacionesService } from 'src/app/services/canchas-reservaciones.service';
import { DisponibilidadReservacionService } from 'src/app/services/disponibilidad-reservacion.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
interface horas{
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class GenerarReservacionPage  implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @Input() fecha: Date;
  @Input()cancha : ListaCanchas;

  show = false;
  dateValue1 =  new Date().getHours() + ':00:00'
  nuevaReservacion = {
    Cod_Cancha:  null,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: true,
    Titulo: 'Reservación Externa',
    Fecha:  null,
    Hora_Inicio: this.generrReservacionService.horaSeleccionada,
    Estado:  true,
    diaCompleto:  false,
    Descripcion: ''
   }
  valor = this.nuevaReservacion.diaCompleto ? 'SI' : 'NO';
  arregloHorasDisponibles :horas[]=[];
   defaultColumnOptions = [['Dog', 'Cat', 'Bird', 'Lizard', 'Chinchilla']];

   multiColumnOptions = [
    ['Minified', 'Responsive', 'Full Stack', 'Mobile First', 'Serverless'],
    ['Tomato', 'Avocado', 'Onion', 'Potato', 'Artichoke'],
  ];
  private selectedAnimal: string;
  constructor(
    public modalCtrl: ModalController,
    public canchasReservacionesService: CanchasReservacionesService,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService,
    public disponibilidadReservacionService: DisponibilidadReservacionService,
    private cdRef:ChangeDetectorRef,
    public generrReservacionService: GenerarReservacionService,
    public pickerController: PickerController
  ) { }
  

  ngOnInit() {


  this.nuevaReservacion.Cod_Cancha = this.cancha.Cod_Cancha;
    this.nuevaReservacion.Fecha = this.fecha;
    this.generrReservacionService.generarReservacion(  this.nuevaReservacion.Cod_Cancha,this.fecha);

  }

  async  openPicker(numColumns = 1, numOptions = 5, columnOptions = this.defaultColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      mode:'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          },
        },
      ],
    });

    await picker.present();
  }

   getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }

    return columns;
  }

   getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }

    return options;
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  //  this.nuevaReservacion.Hora_Inicio = this.disponibilidadReservacionService.arregloHorasDisponibles[0].hora_inicio;
  }
  
  
  reset(){

    this.nuevaReservacion = {
      Cod_Cancha: 0,
      Cod_Usuario: 0,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha: '',
      Hora_Inicio: '',
      Estado: false,
      diaCompleto: false,
      Descripcion: ''
    };
  

  
  }
  cerrarModal(){

    this.modalCtrl.dismiss();

  }

save() {
  console.log(this.nuevaReservacion, this.generrReservacionService.horaSeleccionada)
  let i = this.generrReservacionService.horasdiaConsulta.findIndex(hora => hora.hora_inicio == this.generrReservacionService.horaSeleccionada);
let hora_i = null,
    hora_f = null;
  if( i>=0){
hora_i = this.generrReservacionService.horasdiaConsulta[i].hora_inicio
hora_f = this.generrReservacionService.horasdiaConsulta[i].hora_fin
  }
let nuevaReservacion = {

  Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
  Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
  Reservacion_Externa: this.nuevaReservacion.Reservacion_Externa,
  Titulo: this.nuevaReservacion.Titulo,
  Fecha:  this.nuevaReservacion.Fecha,
  hora_Inicio:hora_i,
  hora_Fin:hora_f,
  Estado:  this.nuevaReservacion.Estado,
  diaCompleto:  this.nuevaReservacion.diaCompleto,
  Descripcion: this.nuevaReservacion.Descripcion

 }
console.log(nuevaReservacion)
this.reservacionesService.insertarReservacion(nuevaReservacion);


this.cerrarModal();


}

switch(value){
  value ? this.valor = 'SI' : this.valor = 'NO';
}

    


}
