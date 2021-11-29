import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.scss'],
})
export class SettingInfoComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {}


}
