import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard.ts.guard';
import { RoleGuard } from './core/guards/role.guard.ts.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [

  // AUTH ROUTES (NO SIDEBAR)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.module')
            .then(m => m.AuthModule)
      }
    ]
  },

  // PROTECTED ROUTES (WITH SIDEBAR)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./features/tickets/tickets.module')
            .then(m => m.TicketsModule)
      },
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        loadChildren: () =>
          import('./features/admin/admin.module')
            .then(m => m.AdminModule)
      }
    ]
  },

  // DEFAULT ROUTE
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // INVALID ROUTE
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
