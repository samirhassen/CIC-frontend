// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { MsalRedirectComponent } from '@azure/msal-angular';

export const routes: Routes = [
     {
        path: '',
        component: LoginComponent, // root path goes to login
      },
      {
        path: '',
        component: LayoutComponent, // layout contains header/footer
        children: [
          { path: 'home', component: HomeComponent },
          // add other routes here
        ],
      },
      { path: '**', redirectTo: '' }, // fallback
      { path: 'auth', component: MsalRedirectComponent }
];
