import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugComponent } from './bug.component';

const routes: Routes = [{ path: '', component: BugComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugRoutingModule { }
