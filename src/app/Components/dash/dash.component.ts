import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
name!:string
constructor(private serv:ApiService) {}
onPush(){
  this.serv.getUser(this.name)
}
}
