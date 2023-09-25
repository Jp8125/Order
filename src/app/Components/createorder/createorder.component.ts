import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { OrderModel } from 'src/app/Models/order.model';
@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent {
private hubconnection!:signalR.HubConnection
p:number=0
uid!:number
oid:number=1
foodname!:string;
username!:string
orders:Array<OrderModel>=[]
constructor() {
  let id=parseInt(localStorage.getItem('id') as string)
  this.uid=id;
  this.username=localStorage.getItem('name') as string
    this.CreateConnection(id)
}
CreateConnection(id:number){
  this.hubconnection=new signalR.HubConnectionBuilder().withUrl('https://localhost:7036/orders?Uid='+id).build();
  this.startConnection();
  this.hubconnection.on("create",(order)=>{
    this.orders.push(order);
    console.log(order);
  })
  this.hubconnection.on("rejected",(data:OrderModel)=>{

    alert("Order rejected")
    let i=this.orders.findIndex(obj=>obj.id==data.id)
    this.orders[i]=data
  })
  this.hubconnection.on("accept",(data:OrderModel)=>{
    alert("Order acceped")
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
CreateOrder(){
  let name=this.foodname;
  let uid=this.uid;
  let ownerId=this.oid
this.hubconnection.invoke("createOrder",name,uid,ownerId)
this.foodname=""
}
}
