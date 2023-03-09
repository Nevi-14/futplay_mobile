import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmailService } from 'src/app/services/email.service';
import { GoogleAdsService } from 'src/app/services/google-ads.service';

@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.page.html',
  styleUrls: ['./video-screen.page.scss'],
   host: {
        'autoplay': '',
        'oncanplay': 'this.play()',
        'onloadedmetadata': 'this.muted = true'
    }
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
    public googleAddService: GoogleAdsService,
    public emailService: EmailService,
    public alertasService:AlertasService
  ) { }

  ngOnInit() {
   // this.googleAddService.showBanner()
  
   console.log('index vide to play', this.index)


   setTimeout(()=>{ 
    this.googleAdd();
  }, 2000);

   setTimeout(()=>{ 
    this.pauseVideo();
  }, 3200);

  }

  googleAdd(){
    switch (this.index) {

      case 0:
        this.googleAddService.showInterstitial();
     
        break;
      case 1:
        this.googleAddService.showInterstitial();
       
        break;
      case 2:
        this.googleAddService.showInterstitial();
     
        break;
      case 3:
        this.googleAddService.showInterstitial();
      
        break;
      case 4:
        this.googleAddService.showInterstitial();
      
        break;
      case 5:
        this.googleAddService.showInterstitial();
    
        break;
      case 6:
        this.googleAddService.showInterstitial();
        
        break;
        case 7:
          this.cerrarModal();
          break;
      default:
this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal!.')
        break;



    }
  }

  cerrarModal() {
   // this.googleAddService.hideBanner();
    this.modalCtrl.dismiss();

  }

  pauseVideo(){
    this.videoElement = this.video.nativeElement;
    //  this.videoElement.play();
    this.videoElement.pause();
  }
}