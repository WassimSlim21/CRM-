import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspaceAdministarteurComponent } from './espace-administarteur.component';

const routes: Routes = [{ path: '', component: EspaceAdministarteurComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdministarteurRoutingModule { }
