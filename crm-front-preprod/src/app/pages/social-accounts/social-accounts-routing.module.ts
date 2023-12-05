import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialAccountsComponent } from './social-accounts.component';

const routes: Routes = [{ path: '', component: SocialAccountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialAccountsRoutingModule { }
