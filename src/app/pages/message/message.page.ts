import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  message: string;

  constructor(private router: Router) { }
  ngOnInit() {
    this.message = '';
  }


  back(){
    this.message = '';
    this.router.navigateByUrl('/home/reservations');
  
  }

  onChangeMessage(event){
    this.message = event.detail.value;

  }
}
