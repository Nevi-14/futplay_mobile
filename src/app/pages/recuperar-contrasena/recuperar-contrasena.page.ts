import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  @ViewChild('emailForm') emailForm: NgForm
email:Email = 
{
  ToEmail:'',
  Subject:'Recuperar Contraseña',
  Body:'Código de verificarión : '
}
verificarCodigo:boolean = false;
codigo = '';
Contrasena = '';
  constructor(
    
    public emailService: EmailService,
    public alertasService: AlertasService,
    public usuariosService: UsuariosService,
    public  autenticacionservice: AutenticacionService,
    public modalCtrl: ModalController
    
    
    ) { }

  ngOnInit() {
    this.reset();
    //this.enviarCorreo();
  }


  verificar(){
    this.verificarCodigo!=this.verificarCodigo;
    this.reset();
  }

  enviarCorreo(emailForm: NgForm){

    if(emailForm.invalid || this.email.ToEmail == '') {
      this.alertasService.message('Futplay','Debes de completar los campos requeridos');
      return;
    
    
    }
    let codigo = String(new Date().getHours()) + String(new Date().getMinutes()) +String(new Date().getMilliseconds());
    this.email.Body =  this.email.Body + codigo;
this.alertasService.presentaLoading('Validando datos')
    this.emailService.syncToPromiseSendEmail(this.email).then(resp =>{
this.alertasService.loadingDissmiss();
this.reset();
this.verificarCodigo = true;
console.log(resp, 'email user')
this.autenticacionservice.actulizarTokenPromise(resp, codigo, new Date().getHours()).then(resp =>{

  this.alertasService.message('Futplay','Codigo Enviado!');

})

      
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('Futplay','Lo sentimos algo salio mal!');

    })
    this.reset();

  }
  validarCodigo(){
//this.verificarCodigo = !verificarCodigo
console.log(new Date())
this.autenticacionservice.actualizarContrasenaPromise(this.codigo, this.usuariosService.hashPassword(this.Contrasena)).then(resp =>{
  this.codigo = '';
  this.Contrasena = '';
  this.cerrarModal();
this.alertasService.message('FUTPLAY', 'Contrasena cambiada')


  })
}

cerrarModal(){

  this.modalCtrl.dismiss();
}

  reset(){
this.codigo = '';
this.Contrasena = '';
    this.email = 
{
  ToEmail:'',
  Subject:'Recuperar Contraseña',
  Body:'Código de verificarión : '
}
  }


}
