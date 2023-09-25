import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { OrderModel } from 'src/app/Models/order.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  private hubconnection!:signalR.HubConnection
  orders:Array<OrderModel>=[]
  p:number=0
  constructor() {
    let id=parseInt(localStorage.getItem('id') as string)
      this.CreateConnection(id)
  }
  CreateConnection(id:number){
    this.hubconnection=new signalR.HubConnectionBuilder().withUrl('https://localhost:7036/orders?Uid='+id).build();
    this.startConnection();
    this.hubconnection.on("create",(order)=>{
      alert("Order received")
      this.orders.push(order);
    }),
    this.hubconnection.on("accept",(data)=>{
      let i=this.orders.findIndex(obj=>obj.id==data.id)
      this.orders[i]=data
    })
  }
  startConnection(){
    this.hubconnection.start().then(()=>{
      console.log('connected to the server');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  AcceptOrder(uid:number,oId:number){
    this.hubconnection.invoke("AcceptOrder",uid,oId)
  }
  RejectOrder(uid:number,oId:number){
    this.hubconnection.invoke("RejectOrder",uid,oId)
  }
}
