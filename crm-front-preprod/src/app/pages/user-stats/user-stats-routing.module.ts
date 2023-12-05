import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserStatsComponent } from './user-stats.component';

const routes: Routes = [{ path: '', component: UserStatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserStatsRoutingModule { }
