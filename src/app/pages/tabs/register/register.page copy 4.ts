import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
;
import { format } from 'date-fns';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { SeleccionarFechaPage } from '../../seleccionar-fecha/seleccionar-fecha.page';
import { AlertasService } from 'src/app/services/alertas.service';


@Component({selector: 'app-register', templateUrl: './register.page.html', styleUrls: ['./register.page.scss']})
export class RegisterPage implements OnInit {
  private modalOpen:boolean = false;
  public tipos  =[{nombre:'1',valor:'general'},{nombre:'2',valor:'cumpleanos'},{nombre:'3',valor:'seguridad'}];
  public selectedType: string ='general';

// MONTHS ARE ALWAYS THE SAME

  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
days = [];
years = [];
selectedYear = new Date().getFullYear();
selectedMonth: string;
selectedDay:number;
previousDay:number;
usuario = {
  Cod_Provincia: null,
  Cod_Canton : null,
  Cod_Distrito : null,
  Cod_Posicion: 1,
  Cod_Role: 2,
  Modo_Customizado: false,
  Foto: 'user.svg',
  Nombre: '',
  Primer_Apellido: '',
  Segundo_Apellido: '',
  Fecha_Nacimiento: format(new Date(), 'yyyy-MM-dd'),
  Telefono: '',
  Correo: '',
  Contrasena: '',
  FechaRegistro : new Date(),
  Intentos:0,
  Estatura: 0,
  Peso: 0,
  Apodo: '',
  Partidos_Jugados: 0,
  Partidos_Jugador_Futplay: 0,

};

  confirmarContrasena = null;
  showPass = false;
  showPassConfirm = false;
  provincia = null;
  canton: null;
  distrito: null;
  constructor(
    private route: Router,
    public usuariosServicio : UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {

    this.provinciasService.syncProvincias();
  }



    
  registro(fRegistro: NgForm){
    if(fRegistro.invalid || this.confirmarContrasena != this.usuario.Contrasena) {

this.alertasService.message('FUTPLAY','Verifica que ambas contraseñas sean las mismas!')
return;

    }
    console.log(fRegistro.valid);
    console.log(this.usuario)
    this.usuariosServicio.registro(this.usuario)
    
    }
    syncProvincias(){
      this.provinciasService.syncProvincias();
    }
  
  
    onChange($event , provincia, canton, distrito){
      if(provincia){
    
     this.cantonesService.syncCantones($event.target.value);
      }else if(canton){
    
        this.distritosService.syncDistritos(this.usuario.Cod_Provincia, $event.target.value);
    
      }else{
        
      }
      console.log($event.target.value);
      }
  
  
  
  
  
  async SelectDate(){
    if (!this.modalOpen){
      this.modalOpen = true;
      const modal = await this.modalCrtl.create({
        component:SeleccionarFechaPage,
        cssClass:'date-modal',
        componentProps:{
          title:'Fecha de nacimiento',
          id: 'seleccionar-fecha'
        },
        id: 'seleccionar-fecha'
      })
    
      await modal.present();
      const { data } = await modal.onWillDismiss();
   
      if(data !== undefined ){
        console.log(data,'data')
       this.usuario.Fecha_Nacimiento = data.date
            this.modalOpen = false;
      }else{
   
             this.modalOpen = false;
      }
      
    }
  
    
  }
  
  
  
  
    segmentChanged(event:any){
      console.log(event)
      
      this.selectedType = event.detail.value;
        }
  
  
        regresar(){
          this.route.navigate(['/inicio-sesion'])
        }
}
