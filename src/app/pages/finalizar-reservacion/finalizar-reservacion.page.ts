import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { format } from 'date-fns';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { Reservaciones } from 'src/app/models/reservaciones';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmailService } from 'src/app/services/email.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

const PRODUCT_GEMS_KEY = 'futplay.dev.coding';
const PRODUCT_PRO_KEY = 'futplay.dev.coding';
@Component({
  selector: 'app-finalizar-reservacion',
  templateUrl: './finalizar-reservacion.page.html',
  styleUrls: ['./finalizar-reservacion.page.scss'],
})
export class FinalizarReservacionPage implements OnInit {
  @Input() cancha:PerfilCancha;
  @Input()  nuevaReservacion:Reservaciones;
  @Input() detalleReservacion: DetalleReservaciones;
  @Input()rival : PerfilEquipos;
  @Input()retador : PerfilEquipos;
  @Input()actualizar : boolean;
  total:number = 0;
  gems = 0;
  isPro = false;
  products: IAPProduct[] = [];

  constructor(
    private plt: Platform, 
    private store: InAppPurchase2, 
    private alertController: AlertController, 
    private ref: ChangeDetectorRef, 
    public modalCtrl:ModalController,
    public alertasService:AlertasService,
    public gestionReservacionesService:ReservacionesService,
    public emailService:EmailService,
    public usuariosService:UsuariosService,
    public router:Router
    ) {
    this.plt.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;

      this.registerProducts();
      this.setupListeners();

      // Get the real product information
      this.store.ready(() => {
        this.products = this.store.products;
        console.log('products', this.products)
       // alert(JSON.stringify(this.products))
        this.ref.detectChanges();
      });
    });
  }

  registerProducts() {
    this.store.register({
      id: PRODUCT_GEMS_KEY,
      type: this.store.NON_CONSUMABLE,
    });

    this.store.register({
      id: PRODUCT_PRO_KEY,
      type: this.store.NON_CONSUMABLE,
    });

    this.store.refresh();
  }

  setupListeners() {
    // General query to all products
    this.store.when('product')
      .approved((p: IAPProduct) => {
        // Handle the product deliverable
        if (p.id === PRODUCT_PRO_KEY) {
          this.isPro = true;
        } else if (p.id === PRODUCT_GEMS_KEY) {
          this.gems += 100;
        }
        this.ref.detectChanges();

        return p.verify();
      })
      .verified((p: IAPProduct) => p.finish());


    // Specific query for one ID
    this.store.when(PRODUCT_PRO_KEY).owned((p: IAPProduct) => {
      this.isPro = true;
    });
  }

  purchase() {
    let product: IAPProduct = this.products[0];
    this.store.order(product).then(p => {
      // Purchase in progress!
    }, e => {
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  // To comply with AppStore rules
  restore() {
    this.store.refresh();
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    console.log('rival', this.rival)
    console.log('retador', this.retador)
    this.detalleReservacion.Cod_Retador = this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Cod_Rival = this.rival.equipo.Cod_Equipo;
    this.detalleReservacion.Monto_Total = this.detalleReservacion.Total_Horas * this.cancha.cancha.Precio_Hora;
    this.detalleReservacion.Precio_Hora = this.cancha.cancha.Precio_Hora;
    this.detalleReservacion.Monto_Equipo = this.detalleReservacion.Monto_Total / 2;
    console.log(this.cancha, this.nuevaReservacion, this.detalleReservacion)
    this.total = Number(((10/100)*this.detalleReservacion.Monto_Total).toFixed(2));
    this.detalleReservacion.Porcentaje_FP  = 10;
    this.detalleReservacion.Monto_FP = this.total * 2;
     this.nuevaReservacion.Detalle = `${this.formatoAmPM(new Date(this.nuevaReservacion.Hora_Inicio))} en  ${this.cancha.cancha.Nombre} `
  }
  regresar(){
    
    this.modalCtrl.dismiss();
  }

  
 enviarReto(){


 if(this.actualizar){
// this.alertasService.message('FUTPLAY','La reservación se guardo con exito!.')
  //if(this.detalleReservacion.Reservacion_Grupal) this.rival = this.retador;
  this.alertasService.presentaLoading('Guardando reto...')
  this.nuevaReservacion.Titulo = this.retador.equipo.Abreviacion +' VS '+this.rival.equipo.Abreviacion;
 
  this.nuevaReservacion.Cod_Estado = 4;
  this.detalleReservacion.Cod_Estado = 4;
  this.detalleReservacion.Confirmacion_Rival = true;
 
 
  console.log('actualzianco this.nuevaReservacion',this.nuevaReservacion);
  console.log('actualzianco this.detalleReservacion',this.detalleReservacion)
this.gestionReservacionesService.syncPutReservacione(this.nuevaReservacion).then((resp:any) =>{
console.log(' this.nuevaReservacion resp', resp)
this.detalleReservacion.Cod_Reservacion = resp.reservacion.Cod_Reservacion;
//this.actualizarDetalle()
this.gestionReservacionesService.syncPutDetalleReservaion(this.detalleReservacion).then(resp =>{
if(this.detalleReservacion.Reservacion_Grupal){
  this.emailService.enviarCorreoReservaciones(1, this.rival.correo, this.nuevaReservacion.Fecha, this.nuevaReservacion.Hora_Inicio, this.cancha.nombre, this.rival.nombre, this.retador.nombre).then(resp =>{
    this.regresar();
    this.router.navigateByUrl('/futplay/mis-reservaciones',{replaceUrl:true})
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se acepto con éxito ');
  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
  })
}else{
  let body = {
    body: {
    email:  null,
    body: "Se ha confirmado un reto para el día " +  this.nuevaReservacion.Fecha +" en  la cancha " +  this.cancha.nombre + " Hora : " +this.formatoAmPM(new Date(this.nuevaReservacion.Hora_Inicio)) + ". Reseto Abierto "+this.usuariosService.usuarioActual.nombre+ ".",
    footer: "¡Hay un reto esperándote!"
}

  }

  body.body.email = this.usuariosService.usuarioActual.usuario.Correo;
this.emailService.syncPostReservacionEmail(body).then(resp =>{
  body.body.email = this.cancha.correo;
  this.emailService.syncPostReservacionEmail(body).then(resp =>{
    this.regresar();
    this.router.navigateByUrl('/futplay/mis-reservaciones',{replaceUrl:true})
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ')
  
  })


 

})

   


}



      
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

 }else{
// this.alertasService.message('FUTPLAY','La reservación se guardo con exito!.')
  //if(this.detalleReservacion.Reservacion_Grupal) this.rival = this.retador;
  this.alertasService.presentaLoading('Guardando reto...')
  this.nuevaReservacion.Titulo = !this.detalleReservacion.Reservacion_Grupal ? this.retador.equipo.Abreviacion +' VS '+this.rival.equipo.Abreviacion : 'Reto Abierto ' + this.cancha.nombre;
    this.nuevaReservacion.Fecha = format( new Date(this.nuevaReservacion.Fecha),'yyy-MM-dd');
  this.nuevaReservacion.Hora_Inicio = format( new Date(this.nuevaReservacion.Hora_Inicio),'yyy-MM-dd')+" "+new Date(this.nuevaReservacion.Hora_Inicio).toTimeString().split(' ')[0] 
  this.nuevaReservacion.Hora_Fin =  format( new Date(this.nuevaReservacion.Hora_Fin),'yyy-MM-dd')+" "+new Date(this.nuevaReservacion.Hora_Fin).toTimeString().split(' ')[0] 
 

  if(this.detalleReservacion.Reservacion_Grupal) {
    this.nuevaReservacion.Cod_Estado = 10;
    this.detalleReservacion.Cod_Estado = 10;
    this.detalleReservacion.Cod_Rival = this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Confirmacion_Rival = true;
      }

  console.log('this.nuevaReservacion',this.nuevaReservacion);
  console.log('this.detalleReservacion',this.detalleReservacion)
this.gestionReservacionesService.insertarReservacionToPromise(this.nuevaReservacion).then((resp:any) =>{
console.log(' this.nuevaReservacion resp', resp)
this.detalleReservacion.Cod_Reservacion = resp.reservacion.Cod_Reservacion;
//this.actualizarDetalle()
this.gestionReservacionesService.insertarDetalleReservacionToPromise(this.detalleReservacion).then(resp =>{
if(this.detalleReservacion.Reservacion_Grupal){
  this.emailService.enviarCorreoReservaciones(1, this.rival.correo, this.nuevaReservacion.Fecha, this.nuevaReservacion.Hora_Inicio, this.cancha.nombre, this.rival.nombre, this.retador.nombre).then(resp =>{
    this.regresar();
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ');
  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
  })
}else{
  let body = {
    body: {
    email:  null,
    body: "Se ha confirmado un reto para el día " +  this.nuevaReservacion.Fecha +" en  la cancha " +  this.cancha.nombre + " Hora : " +this.formatoAmPM(new Date(this.nuevaReservacion.Hora_Inicio)) + ". Reseto Abierto "+this.usuariosService.usuarioActual.nombre+ ".",
    footer: "¡Hay un reto esperándote!"
}

  }

  body.body.email = this.usuariosService.usuarioActual.usuario.Correo;
this.emailService.syncPostReservacionEmail(body).then(resp =>{
  body.body.email = this.cancha.correo;
  this.emailService.syncPostReservacionEmail(body).then(resp =>{
    this.regresar();
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ')
  
  })


 

})

   


}



      
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
   
     
  }

  formatoAmPM (date:Date) {
    // hour: 'numeric', minute: 'numeric', hour12: true
    return date.toLocaleString('en-US', { hour: '2-digit',minute: '2-digit', hour12: true })
  }
}
