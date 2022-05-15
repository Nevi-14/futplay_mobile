import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
})
export class SobreNosotrosPage implements OnInit {
  slides: { img: string; titulo: string; desc: string }[] = [
    {
      img: '/assets/slides/football-field.svg',
      titulo: '¿Te gustaria disfrutar de un buen partido?',
      desc: 'Disfruta de un excelente partido de fútbol con nosotros'
    },
    {
      img: '/assets/slides/lineup.svg',
      titulo: '¿No tienes un equipo?',
      desc: 'Haz tu propia ficha técnica '
    },
    {  img: '/assets/slides/strategy.svg',
      titulo: '¿Te gustaria crear un club?',
      desc: 'Crea o únete a un club con tus amigos'
    },
    {
      img: '/assets/slides/cup.svg',
      titulo: '¿Te gustan los retos?',
      desc: 'Reta a otros clubes en tu zona'
    },
    {
      img: '/assets/slides/scoreboard.svg',
      titulo: 'Resultados del partido',
      desc: '¡Reserva el recinto y juega! '
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
