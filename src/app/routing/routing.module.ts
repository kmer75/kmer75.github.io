import { ClientStartComponent } from './../client/client/client-start/client-start.component';
import { ClientDashboardComponent } from './../client/client/client-dashboard/client-dashboard.component';
import { ClientListComponent } from './../client/client/client-list/client-list.component';
import { CLIENT_ROUTE } from './../client/client-route';
import { ClientDetailComponent } from './../client/client/client-detail/client-detail.component';
import { ClientEditComponent } from './../client/client/client-edit/client-edit.component';
import { ClientSaveComponent } from './../client/client/client-save/client-save.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './../client/client/client.component';
import { PatronComponent } from './../shared/patron/patron.component';

const routes: Routes = [
  {
    path: 'test',
    component: PatronComponent
  },
  {
    path: 'dashboard',
    component: ClientDashboardComponent
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },

  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'client/add', component: ClientSaveComponent
  },

  {
    path: 'client/edit/:id', component: ClientSaveComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
