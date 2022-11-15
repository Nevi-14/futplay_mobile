import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';



@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.page.html',
  styleUrls: ['./video-screen.page.scss'],
})
export class VideoScreenPage implements OnInit {
  @Input() index: number;
  @ViewChild("video") video: ElementRef; // binds to #video in video.html
  videoElement: HTMLVideoElement;
  videos = [

    { id: '0', titulo: 'Nuevo Equipo', video: 'assets/videos/nuevo-equipo.mov' },
    { id: '1', titulo: 'Reto Enviado', video: 'assets/videos/reto-enviado.mov' },
    { id: '2', titulo: 'Reto Confirmado', video: 'assets/videos/reto-confirmado.mov' },
    { id: '3', titulo: 'Rumor Transferencia', video: 'assets/videos/rumor-transferencia.mov' },
    { id: '4', titulo: 'Transferencia Confirmada', video: 'assets/videos/transferencia-confirmada.mov' },
    { id: '5', titulo: 'Inicio Partido', video: 'assets/videos/inicio-partido.mov' },
    { id: '6', titulo: 'Fin Partido', video: 'assets/videos/fin-partido.mov' },
    { id: '7', titulo: 'Registro', video: 'assets/videos/registro.mp4' }

  ]
  email:Email = 
  {
    ToEmail:'',
    Subject:'',
    Body:''
  }
  close = false;
  constructor(
    public modalCtrl: ModalController,
    public alertasService:AlertasService
  ) { }

  ngOnInit() {
   // this.googleAddService.showBanner()

  }


 
}
