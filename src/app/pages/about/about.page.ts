import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  slides: { titulo: string; desc: string }[] = [
    { titulo: 'Unete a un equipo',
      desc: 'Solo o acompañado?'
    },
    {
titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
