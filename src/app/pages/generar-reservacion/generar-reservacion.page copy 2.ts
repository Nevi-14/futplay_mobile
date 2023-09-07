import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlertController, IonContent, IonDatetime, ModalController, PickerController, PopoverController, } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { PerfilCancha } from '../../models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { CanchasService } from '../../services/canchas.service';
import { EmailService } from 'src/app/services/email.service';
import { EquiposService } from '../../services/equipos.service';
import { format } from 'date-fns';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
import { Reservaciones } from 'src/app/models/reservaciones';
interface objetoFecha {
  id: number,
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
  time12: number,
  meridiem: string,
  date: Date
}
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GenerarReservacionPage {
  @Input() cancha: PerfilCancha;
  rival: PerfilEquipos;
  retador: PerfilEquipos;
  validarReservacion: boolean = false;
  nuevaReservacion:Reservaciones = {
    Cod_Reservacion:null,
    Cod_Cancha: null,
    Cod_Moneda:1,
    Cod_Tipo:1,
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: false,
    Titulo: '',
    Detalle:'',
    Cod_Estado: 2,
    Fecha: new Date(format(new Date(), 'yyy/MM/dd')).toISOString(),
    Hora_Inicio: null,
    Hora_Fin: null,
    Dia_Completo: false
  }
  selectedDate: string;
  selectedTime: string;

  
  detalleReservacion: DetalleReservaciones = {
    Cod_Detalle: null,
    Cod_Reservacion: null,
    Cod_Moneda:1,
    Cod_Estado: 3,
    Cod_Retador: null,
    Cod_Rival: null,
    Confirmacion_Rival: null,
    Luz: null,
    Monto_Luz: 0,
    Total_Horas: 0,
    Precio_Hora: 0,
    Cod_Descuento: null,
    Porcentaje_Descuento: 0,
    Monto_Descuento: 0,
    Porcentaje_Impuesto: 0,
    Monto_Impuesto: 0,
    Porcentaje_FP: 10,
    Monto_FP: 0,
    Monto_Equipo: 0,
    Monto_Sub_Total: 0,
    Monto_Total: 0,
    Pendiente: 0,
    Notas_Estado: 'Confirmacion Pendiente'
  }


  isModalOpen: boolean = false;
  fecha: string = new Date(format(new Date(), 'yyy/MM/dd')).toISOString();
  fechaMinima = new Date(format(new Date(), 'yyy/MM/dd')).toISOString();

  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public popOverCtrl: PopoverController,
    public horarioCanchasService: HorarioCanchasService,
    private cd: ChangeDetectorRef,
    public gestionReservacionesService: ReservacionesService,
    public alertasService: AlertasService,
    public canchasService: CanchasService,
    public emailService: EmailService,
    public equiposService: EquiposService,
    public alertCtrl: AlertController,
    private pickerCtrl: PickerController
  ) { }


  resetearHoras() {

    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.gestionReservacionesService.horaInicioArray = [];
    this.gestionReservacionesService.horaFinArray = [];
  }


  regresar() {
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {

    this.nuevaReservacion = {
      Cod_Reservacion:null,
    Cod_Cancha: null,
    Cod_Moneda:1,
    Cod_Tipo:1,
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: false,
    Titulo: '',
    Detalle:'',
    Cod_Estado: 2,
    Fecha: new Date(format(new Date(), 'yyy/MM/dd')).toISOString(),
    Hora_Inicio: null,
    Hora_Fin: null,
    Dia_Completo: false
    }
    this.detalleReservacion = {
      Cod_Detalle: null,
      Cod_Reservacion: null,
      Cod_Moneda:1,
      Cod_Estado: 3,
      Cod_Retador: null,
      Cod_Rival: null,
      Confirmacion_Rival: null,
      Luz: null,
      Monto_Luz: 0,
      Total_Horas: 0,
      Precio_Hora: 0,
      Cod_Descuento: null,
      Porcentaje_Descuento: 0,
      Monto_Descuento: 0,
      Porcentaje_Impuesto: 0,
      Monto_Impuesto: 0,
      Porcentaje_FP: 10,
      Monto_FP: 0,
      Monto_Equipo: 0,
      Monto_Sub_Total: 0,
      Monto_Total: 0,
      Pendiente: 0,
      Notas_Estado: 'Confirmacion Pendiente'
    }
    if (this.cancha) {
      this.resetearHoras();
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
      this.horarioCanchasService.horarioCancha = [];
      this.consultarHoras();
    }

  }





  async agregarRival() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.equiposService.equipos = [];
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          rival: true
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;

      if (data !== undefined) {
        this.rival = data.equipo;
        this.validarReservacion = true;
        this.cd.detectChanges();

      }

    //  if (!this.validarReservacion) this.alertaRival()
    }


  }
  async tipoReto() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      subHeader:'Seleccionar el tipo de reto',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            console.log('data', data)
            this.nuevaReservacion.Cod_Tipo = data;
            this.cd.detectChanges();
          },
        },
      ],
      mode:'ios',
      inputs: [
        {
          label: 'Reto Individual',
          type: 'radio',
          value: 1,
        },
        {
          label: 'Reto Grupal',
          type: 'radio',
          value: 3,
        },
        {
          label: 'Reto Abierto',
          type: 'radio',
          value: 2,
        },
      ],
    });

    await alert.present();
  }
  async canchaDetalle() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: CanchaDetallePage,
        cssClass: 'my-custom-class',
        mode: 'ios',
        componentProps: {
          cancha: this.cancha,
          reservar: false
        }

      })
      modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
    }

  }

  async agregarRetador() {

    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          rival: false
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
        this.retador = data.equipo;
         
        this.cd.detectChanges();
       
      }
    }
  }


  agregarHoras(h,m) {
    let date = new Date(this.nuevaReservacion.Fecha);
    date.setHours(h);
    date.setMinutes(m)
    date.setSeconds(0)
    date.setMilliseconds(0)
    console.log(date, 'date')
    return date;
  }





  async openPicker(index: number) {

    let data: objetoFecha[] = []

    if (index == 1) {
      await this.gestionReservacionesService.calHoraInicio(this.cancha.cancha.Cod_Cancha, new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd')));

      data = this.gestionReservacionesService.horaInicioArray
    }
    if (index == 2) {
      let fecha = new Date(format(new Date(this.nuevaReservacion.Hora_Inicio), 'yyy/MM/dd'));
      await this.gestionReservacionesService.calHoraFin(this.cancha.cancha.Cod_Cancha, fecha);


      data = this.gestionReservacionesService.horaFinArray
    }

    console.log(this.gestionReservacionesService.horaInicioArray, 'horaInicioArray')

    console.log(this.gestionReservacionesService.horaFinArray, 'horaFinArray')
    // no olvidar +1
    let horaActual = new Date(this.nuevaReservacion.Fecha).getHours() + 1;
    let hora = index == 1 ? horaActual : new Date(this.nuevaReservacion.Hora_Inicio).getHours() == 23 ? 0 : new Date(this.nuevaReservacion.Hora_Inicio).getHours() + 1;
    let options = [];
    let end = index == 2 && horaActual == 23 ? 1 : 24;

    let inicio = index == 2 ? new Date(this.nuevaReservacion.Hora_Inicio).getHours() + 1 : data[0].id;
    let fin = data[data.length - 1].id + 1;

    for (let i = inicio; i < fin; i++) {

      let AmOrPm = i >= 12 ? 'PM' : 'AM';
      let indexH = data.findIndex(e => e.id == i)
      if (indexH >= 0) {
        let option1 = {
          text: `${(String(data[indexH].id % 12 || 12)).padStart(2, '0')} : 00 :  ${AmOrPm}`,
          value: `${this.agregarHoras(i,0)}`,
        }
        let option2 = {
          text: `${(String(data[indexH].id % 12 || 12)).padStart(2, '0')} : 30 :  ${AmOrPm}`,
          value: `${this.agregarHoras(i,30)}`,
        }
        options.push(option1,option2)
      }

      if (i == fin - 1) {
        const picker = await this.pickerCtrl.create({
          mode:'md',
          columns: [
            {
              name: 'hora',
              options: options,
            },

          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Confirmar',
              handler: (value) => {


                if (index == 1) {
                  this.nuevaReservacion.Hora_Fin = null;
                  this.nuevaReservacion.Hora_Inicio = value.hora.value;
                }
                if (index == 2) {
                  this.nuevaReservacion.Hora_Fin = value.hora.value;
          let inicio = new Date(this.nuevaReservacion.Hora_Inicio);
          let fin =    new Date(this.nuevaReservacion.Hora_Fin);    
          console.log('this.nuevaReservacion.Hora_Inicio',this.nuevaReservacion.Hora_Inicio)  
          console.log('this.nuevaReservacion.Hora_Fin',this.nuevaReservacion.Hora_Fin)        
            let totalHoras=     ( fin.getTime() - inicio.getTime()) / 1000;
                console.log('total horas', totalHoras, totalHoras / 60)
                this.detalleReservacion.Total_Horas =  (totalHoras / 60) / 60
                }
                this.cd.detectChanges();
              },


            },
          ],
        });

        await picker.present();
      }
    }


  }

  async finalizarReservacion() {


    this.regresar()
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          cancha: this.cancha,
          nuevaReservacion: this.nuevaReservacion,
          detalleReservacion: this.detalleReservacion,
          rival: this.rival,
          retador: this.retador,
          actualizar: false
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {

      }
    }
  }

  
  async calendario() {

    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: CalendarioPopoverPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          fecha: this.nuevaReservacion.Fecha
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
        this.nuevaReservacion.Fecha = data.fecha;
        this.nuevaReservacion.Hora_Inicio = null;
        this.nuevaReservacion.Hora_Fin = null;
        this.cd.detectChanges();
console.log('dataa', data)
      }
    }
  }
 


  cerrarModal() {
    this.modalCtrl.dismiss();
  }


  consultarHoras() {
    this.horarioCanchasService.syncGetHorarioCanchaToPromise(this.cancha.cancha.Cod_Cancha).then(resp => {
      let horario: HorarioCanchas[] = resp;
      this.gestionReservacionesService.horario = horario;
      let { continuar } = this.gestionReservacionesService.consultarHoras(horario, new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd')))

      if (continuar) {
        this.gestionReservacionesService.calHoraInicio(this.cancha.cancha.Cod_Cancha, new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd')));
      }

      this.cd.detectChanges();


    })
  }



  cambiarFecha($event) {
    let inputDate = $event.detail.value;
    var today = new Date();
    var newDate = new Date(inputDate);
    newDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (newDate.getTime() < today.getTime()) {

      this.alertasService.message('FUTPLAY', 'Lo sentimimos, intenta con una fecha distinta!.');
      return;
    }
    this.resetearHoras();
    this.nuevaReservacion.Fecha = newDate.toISOString();

    this.consultarHoras();
    this.cd.detectChanges()
  }

  enviarReto(){


    this.alertasService.presentaLoading('Guardando reto...')
    this.nuevaReservacion.Titulo =   this.retador.equipo.Abreviacion +' VS '+this.rival.equipo.Abreviacion 
      this.nuevaReservacion.Fecha = format( new Date(this.nuevaReservacion.Fecha),'yyy-MM-dd');
    this.nuevaReservacion.Hora_Inicio = format( new Date(this.nuevaReservacion.Hora_Inicio),'yyy-MM-dd')+" "+new Date(this.nuevaReservacion.Hora_Inicio).toTimeString().split(' ')[0] 
    this.nuevaReservacion.Hora_Fin =  format( new Date(this.nuevaReservacion.Hora_Fin),'yyy-MM-dd')+" "+new Date(this.nuevaReservacion.Hora_Fin).toTimeString().split(' ')[0] 
   
    this.nuevaReservacion.Cod_Estado = 10;
    this.detalleReservacion.Cod_Estado = 10;
    this.detalleReservacion.Cod_Retador = this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Cod_Rival = this.rival.equipo.Cod_Equipo;
    this.detalleReservacion.Confirmacion_Rival = true;
  
    console.log('this.nuevaReservacion',this.nuevaReservacion);
    console.log('this.detalleReservacion',this.detalleReservacion)
  this.gestionReservacionesService.insertarReservacionToPromise(this.nuevaReservacion).then((resp:any) =>{
  console.log(' this.nuevaReservacion resp', resp)
  this.detalleReservacion.Cod_Reservacion = resp.reservacion.Cod_Reservacion;
  //this.actualizarDetalle()
  this.gestionReservacionesService.insertarDetalleReservacionToPromise(this.detalleReservacion).then(async resp =>{
  //  await this.gestionReservacionesService.cargarReservaciones()
    this.regresar();
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ');
  
  
        
        }, error =>{
          this.alertasService.loadingDissmiss();
          this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
        })
        
        return
        this.regresar();
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
      })
        
     }

     formatoAmPM (date:Date) {
      // hour: 'numeric', minute: 'numeric', hour12: true
      return date.toLocaleString('en-US', { hour: '2-digit',minute: '2-digit', hour12: true })
    }
}
