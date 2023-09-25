import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string="https://localhost:7036"
  constructor(private http:HttpClient,private router:Router) { }
  getUser(name:string){
    this.http.get<{id: number, name: string}>(this.url+`/User?name=${name}`).subscribe({next:(value)=>{
        localStorage.setItem('name',value.name)
        localStorage.setItem('id',value.id.toString())
        if(value.name=="Owner"){
          this.router.navigate(['/owner'])
        }
        else
        {
          this.router.navigate(['/usr'])
        }
    },
  error(err) {
      console.log(err);
      
  },
  })
  }

}
