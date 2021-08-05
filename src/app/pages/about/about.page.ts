import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  slides: { img: string; titulo: string; desc: string }[] = [
    {
      img: '/assets/slides/football-field.svg',
      titulo: '¿Te gustaria disfrutar de un buen partido?',
      desc: 'Ven y disfruta de nuestras canchas de futbol 5'
    },
    {
      img: '/assets/slides/lineup.svg',
      titulo: '¿No tienes un equipo?',
      desc: 'No te preocupes!. Podras unirte a alguno de nuestros clubes con solo enviar una solicitud'
    },
    {  img: '/assets/slides/strategy.svg',
      titulo: '¿Te gustaria crear un club?',
      desc: 'Podras dirigir tu propio club y invitar a tu equipo'
    },
    {
      img: '/assets/slides/cup.svg',
      titulo: '¿Te gustan los retos?',
      desc: 'No te preocupes si no tienes contra quien jugar, podras enviar solicitudes de retos a nuestros clubes disponibles'
    },
    {
      img: '/assets/slides/scoreboard.svg',
      titulo: 'Resultados del partido',
      desc: 'Podras en tiempo real actualizar los resultados de tu equipo'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
