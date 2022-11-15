import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor-contrasena',
  templateUrl: './gestor-contrasena.page.html',
  styleUrls: ['./gestor-contrasena.page.scss'],
})
export class GestorContrasenaPage implements OnInit {
  credentials = {
    password: '',
    new: '',
    confirm: ''

  };
  constructor(

    ) { }

  ngOnInit() {
  }

  cerrarModal(){


  }
onSubmit(formulario){

}
}
