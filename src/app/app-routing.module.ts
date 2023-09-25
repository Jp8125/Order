import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './Components/dash/dash.component';
import { CreateorderComponent } from './Components/createorder/createorder.component';
import { OwnerComponent } from './Components/owner/owner.component';

const routes: Routes = [
  { path: '', redirectTo:'/default',pathMatch:'full' },
  { path: 'default', component: DashComponent },
  { path: 'usr', component: CreateorderComponent },
  { path: 'owner', component: OwnerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
