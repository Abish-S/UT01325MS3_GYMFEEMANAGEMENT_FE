import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_layout/pages/login/login.component';
import { DashboardComponent } from './_layout/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./_layout/features/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'program',
        loadChildren: () =>
          import('./_layout/features/programs/programs.module').then(
            (m) => m.ProgramsModule
          ),
      },
      {
        path: 'fees',
        loadChildren: () =>
          import('./_layout/features/fees/fees.module').then(
            (m) => m.FeesModule
          ),
      },
      {
        pathMatch: 'full',
        path: '',
        redirectTo: 'user',
      },
    ],
  },
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
