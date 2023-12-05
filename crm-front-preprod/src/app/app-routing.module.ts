import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'espace-administarteur', loadChildren: () => import('./pages/espace-administarteur/espace-administarteur.module')
      .then(m => m.EspaceAdministarteurModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'companies', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule) },
      { path: 'social-accounts', loadChildren: () => import('./pages/social-accounts/social-accounts.module')
         .then(m => m.SocialAccountsModule) },
      { path: 'tags', loadChildren: () => import('./pages/tags/tags.module').then(m => m.TagsModule) },
      { path: 'benchmarks', loadChildren: () => import('./pages/benchmarks/benchmarks.module').then(m => m.BenchmarksModule) },
      { path: 'packs', loadChildren: () => import('./pages/packs/packs.module').then(m => m.PacksModule) },
      { path: 'markcom/files', loadChildren: () => import('./pages/file/file.module').then(m => m.FileModule) },
      { path: 'markcom/bug', loadChildren: () => import('./pages/bug/bug.module').then(m => m.BugModule) },
      { path: 'markcom/calendar', loadChildren: () => import('./pages/calendar/calendars.module').then(m => m.CalendarsModule) },
      { path: 'config', loadChildren: () => import('./pages/config/config.module').then(m => m.ConfigModule) },


    ]
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  { path: '', loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  { path: 'bug', loadChildren: () => import('./pages/bug/bug.module').then(m => m.BugModule) },
  { path: 'user-stats', loadChildren: () => import('./pages/user-stats/user-stats.module').then(m => m.UserStatsModule) }


];

@NgModule({
  imports: [    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
