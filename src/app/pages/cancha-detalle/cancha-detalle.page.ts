import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CanchasService } from 'src/app/services/canchas.service';
import { PerfilCancha } from '../../models/perfilCancha';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-cancha-detalle',
  templateUrl: './cancha-detalle.page.html',
  styleUrls: ['./cancha-detalle.page.scss'],
})
export class CanchaDetallePage implements OnInit {
  @Input() cancha: PerfilCancha;
  @Input() reservar = true;

  url = environment.archivosURL;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    public canchasService: CanchasService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.cancha, 'cancha');
    this.canchasService.cancha = this.cancha;
    this.cancha.horario.sort((a, b) => a.Cod_Dia - b.Cod_Dia);
    this.canchasService.dia = this.diaSemana(new Date().getDay());
  }
  formatearHorarios(horarios) {
    const horariosPorHora = {};
  
    horarios.forEach((horario) => {
      const horaInicio = this.canchasService.retornaHoraAmPm(horario.Hora_Inicio);
      const horaFin = this.canchasService.retornaHoraAmPm(horario.Hora_Fin);
      const clave = `${horaInicio}-${horaFin}`;
  
      if (!horariosPorHora[clave]) {
        horariosPorHora[clave] = {
          dias: [],
          estado: horario.Estado,
        };
      }
  
      const diaAbreviado = this.diaNombre(Number(horario.Cod_Dia));
      if (horario.Estado === 0) {
        horariosPorHora[clave].dias.push({ dia: diaAbreviado, estado: 'N/A' });
      } else if (!horariosPorHora[clave].dias.some(bloque => bloque.dia === diaAbreviado)) {
        horariosPorHora[clave].dias.push({ dia: diaAbreviado, estado: horario.Estado });
      }
    });
  
    let resultado = '';
    for (const clave in horariosPorHora) {
      if (horariosPorHora.hasOwnProperty(clave)) {
        const bloquesHorarios = horariosPorHora[clave];
        const dias = bloquesHorarios.dias.map(bloque => `${bloque.dia}`).join(', ');
  
        const horaInicio = clave.split('-')[0].replace(/:00/g, '');  // Eliminar :00
        const horaFin = clave.split('-')[1].replace(/:00/g, '');  // Eliminar :00
  
        resultado += `${dias} ${horaInicio} - ${horaFin},\n `;
      }
    }
  
    resultado = resultado.trim();  // Elimina los espacios en blanco finales
    resultado = resultado.replace(/,\s*$/, '');  // Elimina la última coma y espacios en blanco
    return resultado;
  }
  
  
  
  diaNombre(codDia: number): string {
    const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    return dias[codDia];
  }
  formatearHorariosDelDia(horarios) {
    horarios.sort((a, b) => a.Hora_Inicio - b.Hora_Inicio);

    const horariosFormateados = horarios.map((horario) => {
      const horaInicio = this.canchasService.retornaHoraAmPm(horario.Hora_Inicio);
      const horaFin = this.canchasService.retornaHoraAmPm(horario.Hora_Fin);
      return `${horaInicio} - ${horaFin}`;
    });

    return horariosFormateados.join(', ');
  }
 
 


  diaSemana(index) {
    return this.canchasService.diaSemana(index);
  }

  disponibilidadCancha(cancha: PerfilCancha) {
    return this.canchasService.disponibilidadCancha(cancha);
  }

  horarioCancha(cancha: PerfilCancha) {
    return this.canchasService.horarioCancha(cancha);
  }

  disponibilidadReservacion() {
    return this.canchasService.disponibidadReservacion(this.cancha);
  }

  navigate() {
    this.canchasService.navigate();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async canchaReservacion(cancha) {
    this.regresar();
    const modal = await this.modalCtrl.create({
      component: GenerarReservacionPage,
      mode: 'md',
      componentProps: {
        rival: null,
        retador: null,
        cancha: cancha
      }
    });
    await modal.present();
  }
}