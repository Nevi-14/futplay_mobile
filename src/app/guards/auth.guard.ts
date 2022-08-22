import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import {filter,map,take} from 'rxjs/operators';
import { AlertasService } from '../services/alertas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    public alertasService: AlertasService
  ){}
  canLoad(): Observable<boolean>{
    console.log(this.authenticationService.isAuthenticated.pipe(
      filter(val => val !== null)).pipe())
    return this.authenticationService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated=>{

        if(isAuthenticated ){
        this.authenticationService.isAuthenticated.next(true)
          return true;
        }else{
          
          this.router.navigateByUrl('/inicio/inicio-sesion');
          return false;

        }
      })
    );
  }
}
