import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
darkMode: boolean = true;
darkMode2: boolean;
mode = 'Modo oscuro';
icon = 'moon';

  constructor() { }
}
