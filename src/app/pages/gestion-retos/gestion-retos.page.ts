import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-retos',
  templateUrl: './gestion-retos.page.html',
  styleUrls: ['./gestion-retos.page.scss'],
})
export class GestionRetosPage implements OnInit {

  constructor(
public router:Router

  ) { }

  ngOnInit() {
  }
 
  regresar(){
    this.router.navigateByUrl('/futplay/mis-reservaciones', {replaceUrl:true})
  }
  redirigir(ruta){
    this.router.navigateByUrl(ruta,{replaceUrl:true})
      }
}
