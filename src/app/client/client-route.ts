import { ClientStartComponent } from './client/client-start/client-start.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientComponent } from './client/client.component';
import { Routes } from '@angular/router';

export const CLIENT_ROUTE: Routes = [
    {
        path: '', component: ClientStartComponent
    },

    {
        path: ':id', component: ClientDetailComponent
    },
    {
        path: ':id/edit', component: ClientEditComponent
    },
    //     {
    //     path : 'new', component : RecipeEditComponent
    // }
];